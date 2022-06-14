import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../http"
import { Appointment, Episode, IEpisode } from "../interfaces/episode";


export const useDashboard = () => {

    let { accessToken, session } = useContext(AuthContext);
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);

    let [sortedEpisodes, setSortedEpisodes] = useState<Episode[]>();
    let [sortedAppointments, setSortedAppointments] = useState<Appointment[]>();

    useEffect(() => {

        if (!session || !accessToken) return;

        (async () => {
            try {
                setIsError(false);
                setIsLoading(true);

                let promises = [
                    // fetch user episodes
                    http.getEpisodes<IEpisode>(accessToken).then((response) => {
                        if (response?.OK()) {
                            let episodes = response.data.map(e => new Episode(e))
                            episodes = response.data.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
                            setSortedEpisodes(episodes);
                        }
                    }),
                    // fetch user appointments
                    http.getAppointments<Appointment>(accessToken!, session!.id).then(response => {
                        if (response?.OK()) {
                            let appointments = response.data.map(a => new Appointment(a))
                            console.log('getAppointments', appointments);
                            setSortedAppointments(appointments);
                        }
                    })
                ]

                Promise.all(promises).then(values => {
                    setIsLoading(false);
                }).catch(reason => {
                    setIsError(true);
                    setIsLoading(false);
                });


            } catch (err: any) {
                console.log('useDashboard', err);
                setIsError(true);
                setIsLoading(false);
            }
        })()
    }, [accessToken, session])

    return { sortedEpisodes, sortedAppointments, isLoading, isError }
}
