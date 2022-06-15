import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../http";
import { Appointment, Episode, IAppointment, IEpisode } from "../interfaces/episode";


export const useAppointments = () => {

    let { accessToken, session } = useContext(AuthContext);
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);

    let [appointments, setAppointments] = useState<Appointment[]>();
    let [selectedAppointment, selectAppointment] = useState<Appointment>();
    let [selectedEpisode, selectEpisode] = useState<Episode>();

    // load all appointments
    useEffect(() => {
        setIsError(false);
        setIsLoading(true);

        // fetch user appointments
        http.getAppointments<IAppointment>(accessToken!, session!.id).then(response => {
            if (response?.OK()) {
                let appointments: Appointment[] = response.data.map(a => new Appointment(a))
                let sorted = appointments.sort((a, b) => b.start_at.getTime() - a.start_at.getTime())
                setAppointments(sorted);
            }
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })
    }, [accessToken, session]);

    useEffect(() => {

        if (!selectedAppointment) return;

        setIsError(false);
        setIsLoading(true);

        // fetch episode
        http.getEpisode<IEpisode>(accessToken!, selectedAppointment.episode_id).then(response => {
            let episode: Episode | undefined = undefined;
            if (response?.OK()) {
                episode = new Episode(response.data);
            }
            selectEpisode(episode);
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })

    }, [selectedAppointment, accessToken])


    useEffect(() => {
        // get other details e.g. case notes and e-documents
    }, [selectedAppointment])

    return {
        isLoading, isError,
        appointments,
        selectedAppointment, selectAppointment,
        selectedEpisode
    }

}
