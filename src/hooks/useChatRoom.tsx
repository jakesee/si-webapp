import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../http";
import { Appointment, Episode, IAppointment, IEpisode } from "../interfaces/episode";

export const useChatRoom = (appointmentId:number) => {

    let { accessToken, session } = useContext(AuthContext);
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);
    let [episode, setEpisode] = useState<Episode>();
    let [appointment, setAppointment] = useState<Appointment>();

    useEffect(() => {
        if (!accessToken || !session || !appointmentId) return;

        setIsError(false);
        setIsLoading(true);

        http.getAppointment<IAppointment>(accessToken, session?.id, appointmentId).then((response) => {
            let _appointment = undefined;
            if (response?.OK()) {
                _appointment = new Appointment(response.data);
            }
            setAppointment(_appointment);
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })

    }, [appointmentId]);


    useEffect(() => {
        if (!accessToken || !session || !appointment) return;

        setIsError(false);
        setIsLoading(true);

        http.getEpisode<IEpisode>(accessToken, appointment.episode_id).then((response) => {
            let _episode = undefined;
            if (response?.OK()) {
                _episode = new Episode(response.data);
            }
            setEpisode(_episode);
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })

    }, [appointment]);



    return {
        isLoading, isError, episode, appointment
    }
}
