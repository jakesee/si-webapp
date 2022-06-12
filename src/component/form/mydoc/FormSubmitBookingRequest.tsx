import { format } from "date-fns";
import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../../context/AppContext";
import { useJourney } from "../../../hooks/useJourney";
import { IProvider } from "../../../interfaces/provider";
import { ITimeslot } from "../../../interfaces/timeslot";
import { IUser } from "../../../interfaces/user";
import { FormButton, FormButtonNav, FormProps, FormTitle, Section } from "../../common";
import { InfoBox } from "../../control/InfoBox";


const AppointmentInfo = styled.div`
    margin-bottom: 15px;
    font-size: 1.4em;
`

const BookingInfo = styled.ul`

    margin-left: 10px;

    li {
        margin-left: 10px;
    }
`

export const FormSubmitBookingRequest = ({ input, onBack, onNext }: FormProps<{
    patient: IUser
    doctor: IUser,
    provider: IProvider,
    timeslot: ITimeslot
}, void>) => {

    let { theme } = useContext(AppContext);

    return (
        <Section>
            <FormTitle>Submit Booking Request</FormTitle>
            <h3>Appointment Booking Details</h3>
            <AppointmentInfo>
                <table>
                    <tbody>
                        <tr><td>Specialisation</td><td>{ input?.provider.title}</td></tr>
                        <tr><td>Doctor</td><td>{`${input?.doctor.firstName} ${input?.doctor.lastName}` }</td></tr>
                        <tr><td>Clinic</td><td>{ input?.doctor.clinic }</td></tr>
                        <tr><td>Date/Time</td><td>{format(input?.timeslot.start!, "d MMM yyyy, EEEE, HH:mm")}</td></tr>
                    </tbody>
                </table>
            </AppointmentInfo>
            <InfoBox type="Info" title={<h3 style={{margin: 0}}>Before submitting your booking request:</h3>}>
                <BookingInfo>
                    <li>Arrive at least 2 minutes before your consultation time.</li>
                    <li>Have your identification documents ready for verification by the attending doctor.</li>
                    <li>Missed appointment or late cancellation shall be chargeable. Please refer to Terms & Conditions for more details.</li>
                    <li>Visit "Appointments" from the Dashboard to view the latest appointment status.</li>
                </BookingInfo>
            </InfoBox>
            <FormButtonNav>
                {onBack && <FormButton theme={theme} onClick={(e) => onBack(e)}>Back</FormButton>}
                <FormButton theme={theme} color="primary" className="right" onClick={(e) => onNext(e)}>Submit</FormButton>
            </FormButtonNav>
        </Section>
    )
}
