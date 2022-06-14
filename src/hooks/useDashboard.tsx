<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../http"
import { EpisodeStatus, EpisodeType, IAppointment, IEpisode } from "../interfaces/episode";


export const useDashboard = () => {


    let { accessToken, session } = useContext(AuthContext);
    let [activeAppointment, setActiveAppointment] = useState<IAppointment | null>();
=======
import { useEffect, useState } from "react";
import http from "../http"
import { EpisodeStatus, EpisodeType, IEpisode } from "../interfaces/episode";


export const useDashboard = (accessToken: string) => {

    let [activeDoctorEpisode, setActiveDoctorEpisode] = useState<IEpisode | null>();
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4
    let [activeConciergeEpisode, setActiveConciergeEpisode] = useState<IEpisode | null>();
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);


    useEffect(() => {

<<<<<<< HEAD
        if (!session || !accessToken) return;
=======
        const getActiveEpisode = (episodes: IEpisode[], type: EpisodeType) => {
            let activeEpisodes = episodes.filter(e => e.type === EpisodeType.Diary && e.status == EpisodeStatus.Opened).sort((a, b) => b.id - b.id);
            return activeEpisodes.length > 0 ? activeEpisodes[0] : null;
        }
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4

        (async () => {
            try {
                setIsError(false);
                setIsLoading(true);
<<<<<<< HEAD
                let episodes = await http.getEpisodes<IEpisode>(accessToken!);
                if (episodes) {
                    let activeEpisodes = episodes.filter(e => e.type === EpisodeType.CallCentre && e.status == EpisodeStatus.Opened).sort((a, b) => b.id - b.id);
                    let episode = activeEpisodes.length > 0 ? activeEpisodes[0] : null;
=======
                let episodes = await http.getEpisodes(accessToken);

                if (episodes) {
                    let episode = getActiveEpisode(episodes, EpisodeType.Diary);
                    console.log('doctor', episode);
                    setActiveDoctorEpisode(episode);

                    episode = getActiveEpisode(episodes, EpisodeType.CallCentre);
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4
                    console.log('concierge', episode);
                    setActiveConciergeEpisode(episode);
                }

<<<<<<< HEAD
                let appointments = await http.getAppointments<IAppointment>(accessToken!, session!.id)
                if (appointments) {
                    appointments = appointments.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
                    let appointment = appointments ? appointments[0] : null;
                    console.log('appointment', appointment);
                    setActiveAppointment(appointment);
                }
                setIsLoading(false);
            } catch (err: any) {
                console.log('useDashboard', err);
                setIsError(true);
                setIsLoading(false);
            }
        })()
    }, [accessToken, session])

    return { activeAppointment, activeConciergeEpisode, isLoading, isError }
=======
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
            }
        })()
    }, [accessToken])

    return { activeDoctorEpisode, activeConciergeEpisode, isLoading, isError }
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4
}
