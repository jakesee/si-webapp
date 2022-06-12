import { format } from "date-fns";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../../context/AppContext";
import { useAppointments } from "../../../hooks/useAppointments";
import { Appointment, AppointmentStatus, EpisodeStatus } from "../../../interfaces/episode";
import { UserRole } from "../../../interfaces/user";
import { PageTitle, Section, WideButton } from "../../common";
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

    const { getUpcomingAppointment } = useAppointments();

    const appointment = getUpcomingAppointment();

    return (
        <Page onBack={(e) => navigate('/')} backLabel="Dashboard">
            <PageTitle>Waiting Room</PageTitle>
            {!appointment ? <p>There is no upcoming appointment.</p> :
            <Section>
                <h3>Appointment Details</h3>
                <AppointmentDetails>
                    <table>
                        <tbody>
                                <tr><td>Status</td><td>{appointment.status}</td></tr>
                                <tr><td>Episode Id</td><td>{appointment.episodeId}</td></tr>
                                <tr><td>Specialisation</td><td>{appointment.groupName}</td></tr>
                                <tr><td>Doctor</td><td>{`${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`}</td></tr>
                                <tr><td>Clinic</td><td>{appointment.doctor?.clinic}</td></tr>
                                <tr><td>Date/Time</td><td>{`${format(appointment.startAt, "dd MMM yyyy, HH:mm")} - ${format(appointment.endAt, "HH:mm")}`}</td></tr>
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
