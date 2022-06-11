import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CollapsiblePanel } from "../../control/CollapsiblePanel";
import { AppContext } from "../../../context/AppContext";
import { MobileFrame } from "../../control/MobileFrame";
import { format } from "date-fns"
import { Section as Section, PageTitle as PageTitle } from "../../common";
import groupBy from "lodash/groupBy";
import { UserRole } from "../../../interfaces/user";
import { AppointmentStatus, EpisodeStatus } from "../../../interfaces/episode";
import { Spinner } from "../../control/Spinner";
import { InfoBox } from "../../control/InfoBox";


const AppointmentDetails = styled.div`
    font-size: 1.4em;
    margin-bottom: 20px;

    table tr td {
        padding: 0px 6px;
    }
`



export const Appointments = () => {

    let navigate = useNavigate();

    let { data, session, theme } = useContext(AppContext);

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
        let provider = data.providers.find(p => p.id === episode.providerId);
        let doctor = episode.participants.find(p => p.role === UserRole.doctor)
        let status = getOverallAppointmentStatus(episode.status, a.status);
        return { ...a, episode, doctor, status, groupName: provider?.title }
    });

    let [expandedId, setExpandedId] = useState(0);

    return (
        <MobileFrame backLabel="Dashboard" onBack={(e) => navigate('/') }>
            <PageTitle>Appointments</PageTitle>
            <Section>
                {moreAppointments.map((a, i) => (
                    <CollapsiblePanel key={i} isCollapsed={i !== expandedId} onChange={(e, args) => setExpandedId(i)} label={<p>{`${format(a.startAt, "dd MMM yyyy, HH:mm")}`}</p>}>
                        <h3>Appointment Details</h3>
                        <AppointmentDetails>
                            <table>
                                <tr><td>Status</td><td>{a.status}</td></tr>
                                <tr><td>Episode Id</td><td>{a.episodeId}</td></tr>
                                <tr><td>Specialisation</td><td>{a.groupName}</td></tr>
                                <tr><td>Doctor</td><td>{`${a.doctor?.firstName} ${a.doctor?.lastName}`}</td></tr>
                                <tr><td>Clinic</td><td>{a.doctor?.clinic}</td></tr>
                                <tr><td>Date/Time</td><td>{`${format(a.startAt, "dd MMM yyyy, HH:mm")} - ${format(a.endAt, "HH:mm")}`}</td></tr>
                            </table>
                        </AppointmentDetails>
                        <hr />
                        <h4>Documents</h4>
                        <div>
                            <div>No files</div>
                        </div>
                    </CollapsiblePanel>
                ))}
            </Section>
        </MobileFrame>
    )
}
