import React, { useContext, useState } from "react";
import { FormProps } from "./Form";
import styled from "styled-components";
import { FormNav, FormTitle, FormWrapper } from "../Form.styles";
import { PageButton } from "../../page/mydoc/Page.styled";
import { DataContext } from "../../context/DataContext";
import { ITheme } from "../../interfaces/ui";
import { format } from "date-fns";

const DoctorCard = styled.div`
    margin-bottom: 10px;

    display: flex;
    align-items: center;
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

const DoctorBio = styled.div`
    margin-bottom: 10px;
    padding: 20px;
    font-size: 1.4em;
`

const Timetable = styled.div <{theme: ITheme}>`

    li {
        display: inline-block;
        padding: 3px 6px;

        background: ${props => props.theme.button_secondary_background_color };
        margin: 5px;
        border-radius: 3px;
    }

    li.selected {
        background: ${props => props.theme.button_primary_background_color };
        color: ${props => props.theme.button_primary_foreground_color };
    }
`

export const FormSelectTimeslot = ({ journey, onNext, onBack = undefined }: FormProps) => {


    let { theme } = useContext(DataContext);

    let [timeslot, setTimeslot] = useState(0);

    return (
        <FormWrapper>
            <FormTitle>Select Timeslot</FormTitle>
            <DoctorCard key={journey.doctor?.id}>
                <img src={`${journey.doctor?.imgUrl}`} />
                <div>
                    <div className="name">{`${journey.doctor?.firstName} ${journey.doctor?.lastName}`}</div>
                    <div className="specialty">{journey.doctor?.speciality?.reduce((prev, curr) => `${prev}, ${curr}`)}</div>
                    <div className="clinic">{journey.doctor?.clinic}</div>
                </div>
            </DoctorCard>
            <DoctorBio>{journey.doctor?.bio}</DoctorBio>
            <Timetable theme={theme}>
                {journey.doctor?.availability?.map((a, i) => (
                    <li key={i} className={timeslot == i ? 'selected' : ''} onClick={(e) => setTimeslot(i) }>{format(a.start, "d MMM, HH:mm")}</li>
                ))}
            </Timetable>
            <FormNav>
                {onBack && <PageButton onClick={(e) => onBack(e)}>Back</PageButton>}
                <PageButton theme={theme} color="primary" className="right">Next: {format(journey.doctor?.availability![timeslot].start!, "d MMM, HH:mm") }</PageButton>
            </FormNav>
        </FormWrapper>
    )
}
