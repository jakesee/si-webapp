import React from "react";
import styled from "styled-components";
import { FormButtonNav, FormTitle, FormButton, FormProps, Section } from "../../common";
import { User } from "../../../interfaces/user";


const DoctorCard = styled.div`
    margin-bottom: 10px;

    display: flex;
    align-items: start;
    gap: 20px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }

    .right {
        margin-left: auto;
    }

    .name {
        font-weight: bold;
        font-size: 1.4em;
    }

    .specialty, .clinic {
        font-size: 1.2em;
    }
`

export const FormSelectDoctor = ({ input, defaultValue, onNext, onBack = undefined }: FormProps<User[], User>) => {

    const renderDoctors = () => {
        let element = input?.map(doctor => (
            <DoctorCard key={doctor?.id}>
                <img src={`${doctor?.image_url}`} alt="" />
                <div>
                    <div className="name">{`${doctor?.first_name} ${doctor?.last_name}`}</div>
                    <div className="specialty">{doctor?.speciality && doctor?.speciality.length > 0 ? doctor.speciality.reduce((prev, curr) => `${prev}, ${curr}`) : ''}</div>
                    <div className="clinic">{ doctor?.clinic}</div>
                </div>
                <div className="right"><FormButton onClick={(e) => onNext(e, doctor!)}>Select</FormButton></div>
            </DoctorCard>
        ))
        return element ?? <></>
    };

    return <>
        <Section>
            <FormTitle>Choose a Doctor</FormTitle>
            {renderDoctors()}
            <FormButtonNav>
                {onBack && <FormButton onClick={(e) => onBack(e)}>Back</FormButton>}
            </FormButtonNav>
        </Section>
    </>
}
