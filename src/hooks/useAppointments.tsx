import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../http";
import { Appointment, AppointmentStatus, Episode, EpisodeStatus, IAppointment } from "../interfaces/episode";


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
                console.log('getAppointments', sorted);
                setAppointments(sorted);
            }
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })
    }, [accessToken, session]);


    useEffect(() => {
        // get other details e.g. case notes and e-documents
    }, [selectedAppointment])

    return {
        isLoading, isError,
        appointments,
        selectedAppointment, selectAppointment
    }

}
