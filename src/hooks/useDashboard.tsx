import { useEffect, useState } from "react";
import http from "../http"
import { EpisodeStatus, EpisodeType, IEpisode } from "../interfaces/episode";


export const useDashboard = (accessToken: string) => {

    let [activeDoctorEpisode, setActiveDoctorEpisode] = useState<IEpisode | null>();
    let [activeConciergeEpisode, setActiveConciergeEpisode] = useState<IEpisode | null>();
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);


    useEffect(() => {

        const getActiveEpisode = (episodes: IEpisode[], type: EpisodeType) => {
            let activeEpisodes = episodes.filter(e => e.type === EpisodeType.Diary && e.status == EpisodeStatus.Opened).sort((a, b) => b.id - b.id);
            return activeEpisodes.length > 0 ? activeEpisodes[0] : null;
        }

        (async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                let episodes = await http.getEpisodes(accessToken);

                if (episodes) {
                    let episode = getActiveEpisode(episodes, EpisodeType.Diary);
                    console.log('doctor', episode);
                    setActiveDoctorEpisode(episode);

                    episode = getActiveEpisode(episodes, EpisodeType.CallCentre);
                    console.log('concierge', episode);
                    setActiveConciergeEpisode(episode);
                }

                setIsLoading(false);
            } catch (err) {
                setIsError(true);
            }
        })()
    }, [accessToken])

    return { activeDoctorEpisode, activeConciergeEpisode, isLoading, isError }
}
