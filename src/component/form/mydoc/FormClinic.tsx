import React, { useContext } from "react";
import styled from "styled-components";
import { Section, FormTitle, FormProps, FormButtonNav } from "../../common";
import { AppContext } from "../../../context/AppContext";

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

export const FormClinic = ({ onNext, onBack }: FormProps<void, number>) => {

    const { data, theme } = useContext(AppContext);

    return (
        <Section>
            <FormTitle>Choose a Specialist Clinic</FormTitle>
            <ClinicGrid>
                {data.providers.map(clinic =>
                    <ClinicCell key={clinic.id} onClick={(e) => onNext(e, clinic.id)}>
                        <div className="name">{clinic.title}</div>
                    </ClinicCell>
                )}
            </ClinicGrid>
            <FormButtonNav>
                { onBack && <FormButtonNav theme={theme} onClick={(e) => onBack(e)}>Back</FormButtonNav> }
            </FormButtonNav>
        </Section>
    )
}
