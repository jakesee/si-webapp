import React, { useContext } from "react";
import { Screen } from "./Screen"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PageSection, PageTitle } from "./Page.styled";
import { DataContext } from "../../context/DataContext";

const ClinicGrid = styled.ul`
    margin: 0;
    display: flex;
    flex-direction: column;
`

const ClinicCell = styled.li`
    display: block;
    list-style: none;
    margin-bottom: 10px;
    border: 1px solid #cccccc;
    padding: 10px;
    width: 100%;
`

export const Clinics = () => {

    const navigate = useNavigate();
    const { data } = useContext(DataContext);

    return (
        <Screen onBack={(e) => navigate('/')} backLabel="Dashboard">
            <PageTitle>Clinics</PageTitle>
            <PageSection>
                <p>Where do you want to go today?.</p>
            </PageSection>
            <PageSection>
                <ClinicGrid>
                {data.providers.map(clinic =>
                    <ClinicCell key={clinic.id} onClick={ (e) => navigate(`/start/${clinic.id}`)}>
                        <div className="name">{clinic.title}</div>
                    </ClinicCell>
                    )}
                </ClinicGrid>
            </PageSection>
        </Screen>
    )
}
