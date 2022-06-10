import React, { useContext } from "react";
import { FormProps } from "./Form";
import styled from "styled-components";
import { FormNav, FormTitle, FormWrapper } from "../Form.styles";
import { PageButton } from "../../page/mydoc/Page.styled";
import { DataContext } from "../../context/DataContext";
import { IUser } from "../../interfaces/user";


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

export const FormSelectDoctor = ({ journey, onNext, onBack = undefined }: FormProps) => {

    let { data } = useContext(DataContext);

    const onSelectDoctor = (e: any, doctor: IUser) => {

        journey.setDoctor(doctor);
        journey.onNext();
    }

    const renderDoctors = () => {
        let doctors = data.providers.find(p => p.id === journey.groupId)?.doctorIds.map(doctorId => data.users.find(u => u.id === doctorId))
        let element = doctors?.map(doctor => (
            <DoctorCard key={doctor?.id}>
                <img src={`${doctor?.imgUrl}`} />
                <div>
                    <div className="name">{`${doctor?.firstName} ${doctor?.lastName}`}</div>
                    <div className="specialty">{doctor?.speciality?.reduce((prev, curr) => `${prev}, ${curr}`)}</div>
                    <div className="clinic">{ doctor?.clinic}</div>
                </div>
                <div className="right"><PageButton onClick={(e) => onSelectDoctor(e, doctor!)}>Select</PageButton></div>
            </DoctorCard>
        ))
        return element ?? <></>
    };

    return <>
        <FormWrapper>
            <FormTitle>Choose a Doctor</FormTitle>
            {renderDoctors()}
            <FormNav>
                {onBack && <PageButton onClick={(e) => onBack(e)}>Back</PageButton>}
            </FormNav>
        </FormWrapper>
    </>
}
