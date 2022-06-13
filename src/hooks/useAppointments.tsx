import groupBy from "lodash/groupBy";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppointmentStatus, EpisodeStatus } from "../interfaces/episode";
import { UserRole } from "../interfaces/user";


export const useAppointments = () => {

    let { data, session } = useContext(AppContext);

    const getAppointments = () => {
        let episodes = data.episodes.filter(e => e.participants.findIndex(p => p.id === session?.id) >= 0);
        let episodeIds = episodes.map(e => e.id);
        let appointments = data.appointments.filter(a => episodeIds.includes(a.episodeId));
        appointments = appointments.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());

        // make a dictionary instead of using Array.find() to optmised search
        let groupedEpisodes = groupBy(episodes, e => e.id);

        let moreAppointments = appointments.map(a => {
            let episode = groupedEpisodes[a.episodeId][0];
            let provider = data.providers.find(p => p.id === episode.providerId);
            let doctor = episode.participants.find(p => p.role === UserRole.doctor)
            let status = getAppointmentStatusLabel(episode.status, a.status);
            return { ...a, episode, doctor, status, groupName: provider?.title }
        });

        return moreAppointments;
    }

    const getUpcomingAppointment = () => {
        const appointments = getAppointments();
        if (appointments.length > 0) {
            return appointments.find(a => a.status === "Confirmed");
        }
    }

    const getAppointmentStatusLabel = (episodeStatus: EpisodeStatus, appointmentStatus: AppointmentStatus) => {

        if (episodeStatus === EpisodeStatus.Closed) return "Completed";
        if (appointmentStatus === AppointmentStatus.Accepted) return "Confirmed";
        if (appointmentStatus === AppointmentStatus.Rejected) return "Cancelled";
        if (appointmentStatus === AppointmentStatus.Timeout) return "Cancelled";
        if (appointmentStatus === AppointmentStatus.Completed) return "Consulted";
        return "Pending Confirmation";

    }

    return {
        getAppointments,
        getUpcomingAppointment
    }

}
