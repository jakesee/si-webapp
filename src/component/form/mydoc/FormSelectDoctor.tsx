import React, { useContext } from "react";
import styled from "styled-components";
import { FormButtonNav, FormTitle, FormButton, FormProps, Section } from "../../common";
import { AppContext } from "../../../context/AppProvider";
import { IUser } from "../../../interfaces/user";
import { IProvider } from "../../../interfaces/provider";


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

export const FormSelectDoctor = ({ input, defaultValue, onNext, onBack = undefined }: FormProps<IProvider, IUser>) => {

    let { data } = useContext(AppContext);

    const renderDoctors = () => {
        let doctors = data.providers.find(p => p.id === input!.id)?.doctorIds.map(doctorId => data.users.find(u => u.id === doctorId))
        let element = doctors?.map(doctor => (
            <DoctorCard key={doctor?.id}>
                <img src={`${doctor?.imgUrl}`} alt="" />
                <div>
                    <div className="name">{`${doctor?.firstName} ${doctor?.lastName}`}</div>
                    <div className="specialty">{doctor?.speciality?.reduce((prev, curr) => `${prev}, ${curr}`)}</div>
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
