import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AppointmentStatus, EpisodeStatus, EpisodeType, IAppointment, IEpisode, IMessage, MessageType } from "../interfaces/episode";
import { ITimeslot } from "../interfaces/timeslot";
import { IUser } from "../interfaces/user";
import Generator from "../utils/Generator";

export type Dictionary<T> = { [key: string]: T }

export interface IJourneyState<T extends Dictionary<string>> {
    patient: IUser,
    groupId: number | undefined,
    doctor: IUser | undefined,
    timeslot: ITimeslot | undefined,
    episodeId: number | undefined,
    appointmentId: number | undefined,
    triage: T | undefined,
    step: number,
}

export interface IJourneyHook<T extends Dictionary<string>> extends IJourneyState<T> {
    setPatient: React.Dispatch<React.SetStateAction<IUser>>,
    setGroupId: React.Dispatch<React.SetStateAction<number | undefined>>,
    setDoctor: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    setTimeslot: React.Dispatch<React.SetStateAction<ITimeslot | undefined>>,
    setEpisodeId: React.Dispatch<React.SetStateAction<number | undefined>>,
    setTriage: React.Dispatch<React.SetStateAction<T | undefined>>,
    setAppointmentId: React.Dispatch<React.SetStateAction<number | undefined>>,
    onNext: () => void,
    onBack: () => void,
    submit: () => void,
}



export const useJourney = <T extends Dictionary<string>,>(user: IUser, totalSteps: number): IJourneyHook<T>  => {

    let { data, setData } = useContext(AppContext);

    let [step, setStep] = useState(0);
    let [patient, setPatient] = useState(user);
    let [groupId, setGroupId] = useState<number>();
    let [doctor, setDoctor] = useState<IUser>();
    let [timeslot, setTimeslot] = useState<ITimeslot>();
    let [episodeId, setEpisodeId] = useState<number>();
    let [appointmentId, setAppointmentId] = useState<number>();
    let [triage, setTriage] = useState<T>();

    const onNext = () => {
        if (step + 1 < totalSteps) setStep(step + 1);
    }

    const onBack = () => {
        if (step > 0) setStep(step - 1);
    }

    const submit = () => {

        console.log("submitting");

        let message: IMessage = {
            userId: patient.id,
            message: Object.keys(triage!).map((key) => `${key}: ${triage && triage[key]}`).reduce((prev, next) => `${prev}; ${next}`),
            datetime: new Date(),
            type: MessageType.Message
        }
        let newEpisode: IEpisode = {
            id: Generator.random(10000, 99999),
            providerId: groupId!,
            participants: [patient, doctor!],
            messages: [message],
            status: EpisodeStatus.Opened,
            type: EpisodeType.Diary
        }
        let newAppoinment: IAppointment = {
            id: Generator.random(10000, 99999),
            episodeId: newEpisode.id,
            startAt: timeslot!.start,
            endAt: timeslot!.end,
            status: AppointmentStatus.Accepted
        }

        setData(data => {
            let episodes = [ ...data.episodes, newEpisode ]
            let appointments = [ ...data.appointments, newAppoinment ]
            return { ...data, episodes, appointments };
        });
        setAppointmentId(newAppoinment.id);
        setEpisodeId(newEpisode.id);

        console.log("appt id:", newAppoinment.id, "episode id:", newEpisode.id);
    }

    return {
        patient, setPatient,
        groupId, setGroupId,
        doctor, setDoctor,
        timeslot, setTimeslot,
        episodeId, setEpisodeId,
        triage, setTriage,
        appointmentId, setAppointmentId,
        step, onNext, onBack, submit
    }
}
