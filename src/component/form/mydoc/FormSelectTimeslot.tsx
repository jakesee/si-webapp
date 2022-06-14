import React, { useState } from "react";
import styled from "styled-components";
import { FormButtonNav, FormTitle, FormProps, FormButton, Section } from "../../common";
import { ITheme } from "../../../interfaces/ui";
import { format } from "date-fns";
import groupBy from "lodash/groupBy";
import { CollapsiblePanel } from "../../control/CollapsiblePanel";
import { ITimeslot } from "../../../interfaces/timeslot";
import { User } from "../../../interfaces/user";


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

export const FormSelectTimeslot = ({ input, theme, defaultValue, onNext, onBack = undefined }: FormProps<{ doctor: User, timeslots: ITimeslot[] }, ITimeslot>) => {

    let { doctor, timeslots } = input!;

    const getEarliestAvailability = () => {
        return timeslots && timeslots.length ? timeslots[0] : undefined;
    }

    // track selections
    let earliest = defaultValue ?? getEarliestAvailability();
    let [timeslot, setTimeslot] = useState(earliest);
    let [expandedId, setExpandedId] = useState(0);

    let groupedTimeslots = groupBy(timeslots, (t) => format(t.start, "dd MMM yyyy, EEEE"));

    return (
        <Section>
            <FormTitle>Select Timeslot</FormTitle>
            <DoctorCard key={doctor?.id}>
                <img src={`${doctor?.image_url}`} alt=""/>
                <div>
                    <div className="name">{`${doctor?.first_name} ${doctor?.last_name}`}</div>
                    <div className="specialty">{doctor?.speciality && doctor?.speciality.length > 0 ? doctor.speciality.reduce((prev, curr) => `${prev}, ${curr}`) : ''}</div>
                    <div className="clinic">{doctor?.clinic}</div>
                </div>
            </DoctorCard>
            <DoctorBio>{doctor?.bio}</DoctorBio>

            {Object.keys(groupedTimeslots).map((date, i) => (
                <CollapsiblePanel key={i} head={<p>{date}</p>} isCollapsed={i !== expandedId} onChange={(e, a) => !a.isCollapsing ? setExpandedId(i) : null }>
                    <Timetable theme={theme}>
                        {groupedTimeslots[date].map((t, i) => (
                            <li key={i} className={timeslot === t ? 'selected' : ''} onClick={(e) => setTimeslot(t)}>{`${format(t.start, "HH:mm")} - ${format(t.end, "HH:mm")}`}</li>
                        ))}
                    </Timetable>
                </CollapsiblePanel>
            ))}
            <FormButtonNav>
                {onBack && <FormButton onClick={(e) => onBack(e)}>Back</FormButton>}
                {timeslot && <FormButton theme={theme} color="primary" className="right" onClick={(e) => onNext(e, timeslot!)}>Next: {format(timeslot.start.getTime(), "d MMM, HH:mm")}</FormButton>}
            </FormButtonNav>
        </Section>
    )
}
