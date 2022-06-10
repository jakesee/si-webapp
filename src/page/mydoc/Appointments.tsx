import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CollapsiblePanel } from "../../component/CollapsiblePanel";
import { DataContext } from "../../context/DataContext";
import { Screen } from "./Screen";
import { format } from "date-fns"
import { PageTitle } from "./Page.styled";
import groupBy from "lodash/groupBy";
import { IUser, UserRole } from "../../interfaces/user";
import { AppointmentStatus, EpisodeStatus, IAppointment, IEpisode } from "../../interfaces/episode";

const Wrapper = styled.div`

`

export const Appointments = () => {

    let navigate = useNavigate();

    let { data, session } = useContext(DataContext);

    let episodes = data.episodes.filter(e => e.participants.findIndex(p => p.id === session?.id) >= 0);
    let episodeIds = episodes.map(e => e.id);
    let appointments = data.appointments.filter(a => episodeIds.includes(a.episodeId));
    appointments = appointments.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
    
    let groupedEpisodes = groupBy(episodes, e => e.id);

    const getOverallAppointmentStatus = (episodeStatus: EpisodeStatus, appointmentStatus: AppointmentStatus) => {
        if(episodeStatus === EpisodeStatus.Closed) return "Completed";
        if(appointmentStatus === AppointmentStatus.Accepted) return "Confirmed";
        if(appointmentStatus === AppointmentStatus.Rejected) return "Cancelled";
        if(appointmentStatus === AppointmentStatus.Timeout) return "Cancelled";
        if(appointmentStatus === AppointmentStatus.Completed) return "Consulted";
        return "Pending Confirmation";
    }

    let moreAppointments = appointments.map(a => {
        let episode = groupedEpisodes[a.episodeId][0];
        let doctor = episode.participants.find(p => p.role === UserRole.doctor)
        let status = getOverallAppointmentStatus(episode.status, a.status);
        return { ...a, episode, doctor, status }
    });

    let [expandedId, setExpandedId] = useState(0);

    const getUserName = (user: IUser) => {
        return `${user.firstName} ${user.lastName}`;
    }

    return (
        <Screen backLabel="Dashboard" onBack={(e) => navigate('/') }>
            <PageTitle>Appointments</PageTitle>
            {moreAppointments.map((a, i) => (
                <CollapsiblePanel key={i} isCollapsed={i !== expandedId} onChange={(e, args) => setExpandedId(i) } label={<p>{`${format(a.startAt, "dd MMM yyyy, HH:mm")} - ${format(a.endAt, "HH:mm")}`}</p>}>
                <div><p>Episode Id: {a.episodeId}</p></div>
                <div><p>Status: {a.status}</p></div>
                <div><p>Clinic: {a.doctor?.clinic}</p></div>
                <div><p>Doctor: {`${a.doctor?.firstName} ${a.doctor?.lastName}`}</p></div>
                </CollapsiblePanel>
            ))}
        </Screen>
    )
}
