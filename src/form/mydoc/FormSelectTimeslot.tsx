import React, { useContext, useState } from "react";
import { FormProps } from "./Form";
import styled from "styled-components";
import { FormNav, FormTitle, FormWrapper } from "../Form.styles";
import { PageButton } from "../../page/mydoc/Page.styled";
import { DataContext } from "../../context/DataContext";
import { ITheme } from "../../interfaces/ui";
import { format } from "date-fns";
import groupBy from "lodash/groupBy";
import { CollapsiblePanel } from "../../component/CollapsiblePanel";
import { ITimeslot } from "../../interfaces/timeslot";


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
        cursor: pointer;

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

    // track selections
    let earliest = journey.timeslot ?? (journey.doctor?.availability && journey.doctor.availability.length > 0 ? journey.doctor.availability[0] : undefined);
    let [timeslot, setTimeslot] = useState(earliest);
    let [expandedId, setExpandedId] = useState(0);

    let timeslots = journey.doctor!.availability!;
    let groupedTimeslots = groupBy(timeslots, (t) => format(t.start, "dd MMM yyyy, EEEE"));

    const onSelectTimeslot = (e: any, timeslot: ITimeslot) => {
        journey.setTimeslot(timeslot);
        onNext(e)
    }

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

            {Object.keys(groupedTimeslots).map((date, i) => (
                <CollapsiblePanel key={i} label={<p>{date}</p>} isCollapsed={i !== expandedId} onChange={(e, a) => !a.isCollapsing ? setExpandedId(i) : null }>
                    <Timetable theme={theme}>
                        {groupedTimeslots[date].map((t, i) => (
                            <li key={i} className={timeslot === t ? 'selected' : ''} onClick={(e) => setTimeslot(t)}>{`${format(t.start, "HH:mm")} - ${format(t.end, "HH:mm")}`}</li>
                        ))}
                    </Timetable>
                </CollapsiblePanel>
            ))}
            <FormNav>
                {onBack && <PageButton onClick={(e) => onBack(e)}>Back</PageButton>}
                {timeslot && <PageButton theme={theme} color="primary" className="right" onClick={(e) => onSelectTimeslot(e, timeslot!)}>Next: {format(timeslot.start.getTime(), "d MMM, HH:mm")}</PageButton>}
            </FormNav>
        </FormWrapper>
    )
}
