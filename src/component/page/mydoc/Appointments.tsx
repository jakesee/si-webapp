import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CollapsiblePanel } from "../../control/CollapsiblePanel";
import { AppContext } from "../../../context/AppContext";
import { Page } from "../../control/Page";
import { format } from "date-fns"
import { Section, FormButton } from "../../common";
import { useAppointments } from "../../../hooks/useAppointments";


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
    let { getAppointments } = useAppointments();
    let [expandedId, setExpandedId] = useState(0);

    let appointments = getAppointments();

    return (
        <Page title="Appointments" backLabel="Dashboard" onBack={(e) => navigate('/') }>
            <Section>
                {appointments.map((a, i) => (
                    <CollapsiblePanel key={i} isCollapsed={i !== expandedId} onChange={(e, args) => setExpandedId(i)} head={
                        <AppointmentCardHead>
                            <span>{`${format(a.startAt, "dd MMM yyyy, HH:mm")}`}</span>
                            {a.status === "Confirmed" && (<FormButton theme={theme} color="primary" onClick={ () => navigate('/consultation-room') }>Enter Waiting Room</FormButton>)}
                        </AppointmentCardHead>
                    }>
                        <h3>Appointment Details</h3>
                        <AppointmentDetails>
                            <table>
                                <tbody>
                                    <tr><td>Status</td><td>{a.status}</td></tr>
                                    <tr><td>Episode Id</td><td>{a.episodeId}</td></tr>
                                    <tr><td>Specialisation</td><td>{a.groupName}</td></tr>
                                    <tr><td>Doctor</td><td>{`${a.doctor?.firstName} ${a.doctor?.lastName}`}</td></tr>
                                    <tr><td>Clinic</td><td>{a.doctor?.clinic}</td></tr>
                                    <tr><td>Date/Time</td><td>{`${format(a.startAt, "dd MMM yyyy, HH:mm")} - ${format(a.endAt, "HH:mm")}`}</td></tr>
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
