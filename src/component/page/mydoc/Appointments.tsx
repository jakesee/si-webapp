import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CollapsiblePanel } from "../../control/CollapsiblePanel";
import { AppContext } from "../../../context/AppProvider";
import { Page } from "../../control/Page";
import { format } from "date-fns"
import { Section, FormButton } from "../../common";
import { useAppointments } from "../../../hooks/useAppointments";
import { AppointmentStatus, EpisodeStatus } from "../../../interfaces/episode";
import { Loader } from "../../control/Loader";


const AppointmentDetails = styled.div`
    font-size: 1.4em;
    margin-bottom: 20px;

    table tr td {
        padding: 0px 6px;
    }
`

const AppointmentCardHead = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;

    span {
        font-size: 1.4em;
    }
`

export const Appointments = () => {

    let navigate = useNavigate();

    let { theme } = useContext(AppContext);
    let { isLoading, appointments } = useAppointments();
    let [expandedId, setExpandedId] = useState(0);

    // TODO: select the first appointment on init to load the documents

    return (
        <Page title="Appointments" backLabel="Dashboard" onBack={(e) => navigate('/')}>
            {isLoading && <Loader theme={theme} />}
            <Section>
                {appointments?.map((a, i) => (
                    <CollapsiblePanel key={i} isCollapsed={i !== expandedId} onChange={(e, args) => setExpandedId(i)} head={
                        <AppointmentCardHead>
                            <span>{`${format(a.start_at, "dd MMM yyyy, HH:mm")}`}</span>
                            {a.status === AppointmentStatus.Pending && (<FormButton theme={theme} color="primary" onClick={ () => navigate('/consultation-room') }>Enter Waiting Room</FormButton>)}
                        </AppointmentCardHead>
                    }>
                        <h3>Appointment Details</h3>
                        <AppointmentDetails>
                            <table>
                                <tbody>
                                    <tr><td>Status</td><td>{a.getAppointmentStatusLabel(EpisodeStatus.Closed)}</td></tr>
                                    <tr><td>Episode Id</td><td>{a.episode_id}</td></tr>
                                    <tr><td>Specialisation</td><td>{a.group_name}</td></tr>
                                    <tr><td>Doctor</td><td>{`${a.doctor?.first_name} ${a.doctor?.last_name}`}</td></tr>
                                    <tr><td>Clinic</td><td>{a.doctor?.clinic}</td></tr>
                                    <tr><td>Date/Time</td><td>{`${format(a.start_at, "dd MMM yyyy, HH:mm")} - ${format(a.end_at, "HH:mm")}`}</td></tr>
                                </tbody>
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
        </Page>
    )
}
