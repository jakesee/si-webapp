import React, { useContext } from "react";
import { Screen } from "./Screen"
import styled from "styled-components";
import ChatHistoryIcon from "../../asset/mydoc/icon_chathistory.svg";
import MedicalRecordsIcon from "../../asset/mydoc/icon_medicalrecords.svg";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { PageLargeButton, PageSection, PageTitle } from "./Page.styled";


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

    const navigate = useNavigate()
    const { theme } = useContext(DataContext)

    return (
        <Screen>
            <PageTitle>Dashboard</PageTitle>
            <PageSection>
                <p>Manage all your video consultations here.</p>
            </PageSection>
            <PageSection style={{ marginBottom: "30px" }}>
                <PageLargeButton theme={theme} color="primary" width="100%" onClick={() => navigate('/clinics')}>Consult with a doctor</PageLargeButton>
            </PageSection>
            <PageSection style={{ marginBottom: "30px" }}>
                <p>Video consultation opening hours:</p>
                <p style={{ color: "#888888" }}>9:00AM - 6:30PM from Monday to Friday</p>
                <p style={{ color: "#888888" }}>9:00AM - 12:30PM on Saturday (Closed on Sundays and public holidays)</p>
            </PageSection>
            <PageSection>
                <p style={{marginBottom: "30px"}}>Find your consultation details</p>
                <Grid>
                    <BigButton>
                        <img src={ChatHistoryIcon} />
                        <PageLargeButton theme={theme} width="100%" onClick={() => navigate('/appointments')}>Medical Records</PageLargeButton>
                    </BigButton>
                    <BigButton>
                        <img src={MedicalRecordsIcon} />
                        <PageLargeButton theme={theme} width="100%" onClick={() => navigate('/chat')}>Medical Helpdesk</PageLargeButton>
                    </BigButton>
                </Grid>
            </PageSection>
        </Screen>
    )
}
