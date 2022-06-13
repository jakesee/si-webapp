import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../http"
import { EpisodeStatus, EpisodeType, IAppointment, IEpisode } from "../interfaces/episode";


export const useDashboard = () => {


    let { accessToken, session } = useContext(AuthContext);
    let [activeAppointment, setActiveAppointment] = useState<IAppointment | null>();
    let [activeConciergeEpisode, setActiveConciergeEpisode] = useState<IEpisode | null>();
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);


    useEffect(() => {

        (async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                let episodes = await http.getEpisodes<IEpisode>(accessToken!);
                if (episodes) {
                    let activeEpisodes = episodes.filter(e => e.type === EpisodeType.CallCentre && e.status == EpisodeStatus.Opened).sort((a, b) => b.id - b.id);
                    let episode = activeEpisodes.length > 0 ? activeEpisodes[0] : null;
                    console.log('concierge', episode);
                    setActiveConciergeEpisode(episode);
                }

                let appointments = await http.getAppointments<IAppointment>(accessToken!, session!.id)
                if (appointments) {
                    appointments = appointments.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
                    let appointment = appointments ? appointments[0] : null;
                    console.log('appointment', appointment);
                    setActiveAppointment(appointment);
                }

                setIsLoading(false);
            } catch (err) {
                setIsError(true);
            }
        })()
    }, [accessToken])

    return { activeAppointment, activeConciergeEpisode, isLoading, isError }
}
