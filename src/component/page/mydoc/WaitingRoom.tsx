import { format } from "date-fns";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppointments } from "../../../hooks/useAppointments";
import { AppointmentStatus } from "../../../interfaces/episode";
import { Section, WideButton } from "../../common";
import { InfoBox } from "../../control/InfoBox";
import { Page } from "../../control/Page";

const AppointmentDetails = styled.div`
    font-size: 1.4em;
    margin-bottom: 20px;

    table tr td {
        padding: 0px 6px;
    }
`

const BookingInfo = styled.ul`

    margin-left: 10px;

    li {
        margin-left: 10px;
    }
`

export const WaitingRoom = () => {

    const navigate = useNavigate();

    const { appointments, selectedAppointment, selectAppointment } = useAppointments();

    useEffect(() => {
        const appointment = appointments?.find(a => a.status === AppointmentStatus.Pending);
        selectAppointment(appointment);
    }, [])

    return (
        <Page title="Waiting Room" onBack={(e) => navigate('/')} backLabel="Dashboard">
            {!selectedAppointment ? <p>There is no upcoming appointment.</p> :
            <Section>
                <h3>Appointment Details</h3>
                <AppointmentDetails>
                    <table>
                        <tbody>
                                <tr><td>Status</td><td>{selectedAppointment.status}</td></tr>
                                <tr><td>Episode Id</td><td>{selectedAppointment.episode_id}</td></tr>
                                <tr><td>Specialisation</td><td>{selectedAppointment.group_name}</td></tr>
                                <tr><td>Doctor</td><td>{`${selectedAppointment.doctor?.first_name} ${selectedAppointment.doctor?.last_name}`}</td></tr>
                                <tr><td>Clinic</td><td>{selectedAppointment.doctor?.clinic}</td></tr>
                                <tr><td>Date/Time</td><td>{`${format(selectedAppointment.start_at, "dd MMM yyyy, HH:mm")} - ${format(selectedAppointment.end_at, "HH:mm")}`}</td></tr>
                        </tbody>
                    </table>
                </AppointmentDetails>
                <InfoBox type="Info" title={<h4 style={{ margin: 0 }}>Before your appointment:</h4>}>
                    <BookingInfo>
                        <li>Arrive at least 2 minutes before your consultation time.</li>
                        <li>You will be able to start the video call when the doctor is ready.</li>
                        <li>Have your identification documents ready for verification by the attending doctor.</li>
                        <li>Missed appointment or late cancellation shall be chargeable. Please refer to Terms & Conditions for more details.</li>
                    </BookingInfo>
                </InfoBox>
                <div><WideButton disabled>Start Video</WideButton></div>
                <div><WideButton>Concierge Chat</WideButton></div>
                </Section>
            }
        </Page>
    )
}
