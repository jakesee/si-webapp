import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { AuthContext } from "../context/AuthProvider";
import http from "../http";
import { Appointment, IEpisode, IAppointment } from "../interfaces/episode";
import { IProvider, Provider } from "../interfaces/provider";
import { ITimeslot } from "../interfaces/timeslot";
import { IUser, User } from "../interfaces/user";

export type Dictionary<T> = { [key: string]: T }

export interface IJourneyState<T extends Dictionary<string>> {
    isLoading: boolean,
    isError: boolean,
    patient: User,
    doctors: User[],
    timeslots: ITimeslot[],
    providers: IProvider[],
    provider: IProvider | undefined,
    doctor: User | undefined,
    timeslot: ITimeslot | undefined,
    triage: T | undefined,
    step: number,
    activeEpisode?: IEpisode,
    activeAppointment?: Appointment
}

export interface IJourneyHook<T extends Dictionary<string>> extends IJourneyState<T> {
    setPatient: React.Dispatch<React.SetStateAction<User>>,
    setProvider: React.Dispatch<React.SetStateAction<IProvider | undefined>>,
    setDoctor: React.Dispatch<React.SetStateAction<User | undefined>>,
    setTimeslot: React.Dispatch<React.SetStateAction<ITimeslot | undefined>>,
    setTriage: React.Dispatch<React.SetStateAction<T | undefined>>,
    onNext: VoidFunction,
    onBack: VoidFunction,
    submit: (done: VoidFunction) => void,
}

export const useJourney = <T extends Dictionary<string>,>(user: User, totalSteps: number): IJourneyHook<T>  => {

    let { providerIds } = useContext(AppContext);
    let { accessToken } = useContext(AuthContext);

    // api fetch state
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);

    // form input data
    let [doctors, setDoctors] = useState<User[]>([]);
    let [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    let [providers, setProviders] = useState<IProvider[]>([]);

    // journey output
    let [step, setStep] = useState(0);
    let [patient, setPatient] = useState(user);
    let [provider, setProvider] = useState<IProvider>();
    let [doctor, setDoctor] = useState<User>();
    let [timeslot, setTimeslot] = useState<ITimeslot>();
    let [activeEpisode, setActiveEpisode] = useState<IEpisode>();
    let [activeAppointment, setActiveAppointment] = useState<Appointment>();
    let [triage, setTriage] = useState<T>();

    const onNext = () => {
        if (step + 1 < totalSteps) setStep(step + 1);
    }

    const onBack = () => {
        if (step > 0) setStep(step - 1);
    }

    const submit = (done: VoidFunction) => {

        setIsLoading(true);
        setIsError(false);

        if (!accessToken || !provider || !patient || !doctor) return;

        http.createEpisode<IEpisode>(accessToken, provider?.id, [patient.id, doctor.id]).then(response => {

            if (response && response.code === 200 && accessToken && doctor && timeslot && provider) {
                setActiveEpisode(response.data);
                http.createAppointment<IAppointment>(accessToken, response.data.id, patient.id, doctor?.id, timeslot?.start, provider?.consultation_duration).then(response => {
                    if (response) {
                        setActiveAppointment(new Appointment(response.data));
                        done();
                    }
                    setIsLoading(false);
                })
            }

        }).catch(error => {
            setIsError(true);
        });

        // TODO: send to episode via API
        // let message: IMessage = {
        //     userId: patient.id,
        //     message: Object.keys(triage!).map((key) => `${key}: ${triage && triage[key]}`).reduce((prev, next) => `${prev}; ${next}`),
        //     datetime: new Date(),
        //     type: MessageType.Message
        // }
    }

    // load the providers on init
    useEffect(() => {
        if (!accessToken || providerIds.length === 0) return;

        setIsLoading(true);
        setIsError(false);

        let promises = providerIds.map(i => http.getGroup<IProvider>(accessToken!, i));
        Promise.all(promises).then((values) => {
            let providers = values.filter((p: any) => p !== undefined).map((p: any) => new Provider(p));
            setProviders(providers ?? [])
            setIsLoading(false);
        }).catch((reason) => {
            setIsLoading(false);
            setIsError(true);
            console.log(reason);
        });

    }, [accessToken, providerIds]);

    // update the list of doctors when group selection changed
    useEffect(() => {

        if (!accessToken || !provider) return;

        setIsLoading(true);
        setIsError(false);

        http.getDoctors<IUser>(accessToken, provider.id).then((users) => {
            // transpose
            let newUsers: User[] = [];
            if (users) newUsers = users.map(u => new User(u));
            setDoctors(newUsers);
            setIsLoading(false);
        }).catch(reason => {
            setIsLoading(false);
            setIsError(true);
            console.log(reason);
        })

    }, [accessToken, provider])

    // fetch timeslots when doctor changed
    useEffect(() => {
        if (!accessToken || !doctor || !provider) return;

        setIsLoading(true);
        setIsError(false);

        http.getDoctorTimeslots<string>(accessToken, provider.id, doctor.id).then(value => {
            if (value) {
                let timeslots = value.map(v => {
                    let start = new Date(v);
                    let end = new Date(start.getTime() + (provider?.consultation_duration ?? 15) * 60 * 1000);
                    let timeslot: ITimeslot = { start, end }
                    return timeslot;
                })
                setTimeslots(timeslots);
            } else {
                setTimeslots([]);
            }
            setIsLoading(false);
        }).catch(reason => {
            setIsLoading(false);
            setIsError(true);
        });
    }, [accessToken, doctor, provider])

    return {
        isLoading, isError,
        doctors, timeslots, providers,
        patient, setPatient,
        provider, setProvider,
        doctor, setDoctor,
        timeslot, setTimeslot,
        triage, setTriage,
        activeEpisode, activeAppointment,
        step, onNext, onBack, submit
    }
}
