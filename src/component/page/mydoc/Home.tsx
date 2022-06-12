import React, { useContext } from "react";
import { MobileFrame } from "../../control/MobileFrame"
import styled from "styled-components";
import ChatHistoryIcon from "../../../asset/mydoc/icon_chathistory.svg";
import MedicalRecordsIcon from "../../../asset/mydoc/icon_medicalrecords.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { WideButton, Section, PageTitle } from "../../common";
import { useJourney } from "../../../hooks/useJourney";
import { usePubSub } from "../../../hooks/usePubSub";
import { useAppointments } from "../../../hooks/useAppointments";


const Grid = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    gap: 10px;
`

const BigButton = styled.div`
    display: flex;
    gap: 10px;
    flex: 1 0 auto;
    flex-direction: column;
    align-items: center;

    button {
        cursor: pointer;
    }
`

export const Home = () => {

    const navigate = useNavigate();
    const { theme } = useContext(AppContext);
    const { getUpcomingAppointment } = useAppointments();

    const upcomingAppointment = getUpcomingAppointment();

    return (
        <MobileFrame>
            <PageTitle>Dashboard</PageTitle>
            <Section>
                <p>Manage all your video consultations here.</p>
            </Section>
            <Section style={{ marginBottom: "30px" }}>
                {upcomingAppointment ?
                    <WideButton theme={theme} color="primary" onClick={() => navigate('/waiting-room')}>Enter Waiting Room</WideButton> :
                    <WideButton theme={theme} color="primary" onClick={() => navigate('/start')}>Consult with a doctor</WideButton>
                }
            </Section>
            <Section style={{ marginBottom: "30px" }}>
                <p>Video consultation opening hours:</p>
                <p style={{ color: "#888888" }}>9:00AM - 6:30PM from Monday to Friday</p>
                <p style={{ color: "#888888" }}>9:00AM - 12:30PM on Saturday (Closed on Sundays and public holidays)</p>
            </Section>
            <Section>
                <p style={{marginBottom: "30px"}}>Find your consultation details</p>
                <Grid>
                    <BigButton>
                        <img src={ChatHistoryIcon} />
                        <WideButton theme={theme} onClick={() => navigate('/appointments')}>Appointments</WideButton>
                    </BigButton>
                    <BigButton>
                        <img src={MedicalRecordsIcon} />
                        <WideButton theme={theme} onClick={() => navigate('/chat')}>Medical Helpdesk</WideButton>
                    </BigButton>
                </Grid>
            </Section>
        </MobileFrame>
    )
}
