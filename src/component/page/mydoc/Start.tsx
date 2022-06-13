import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../control/Page";
import { Stepper } from "../../control/Stepper";
import { AppContext } from "../../../context/AppContext";
import { FormTriage, IFormTriageQuestions } from "../../form/mydoc/FormTriage";
import { FormEmergency } from "../../form/mydoc/FormEmergency";
import { FormSelectTimeslot } from "../../form/mydoc/FormSelectTimeslot";
import { FormSelectDoctor } from "../../form/mydoc/FormSelectDoctor";
import { useJourney } from "../../../hooks/useJourney";
import { FormSubmitBookingRequest } from "../../form/mydoc/FormSubmitBookingRequest";
import { IUser } from "../../../interfaces/user";
import { ITimeslot } from "../../../interfaces/timeslot";
import { FormClinic } from "../../form/mydoc/FormClinic";

export const Start = () => {

    let navigate = useNavigate();
    let {theme, session, data } = useContext(AppContext);

    let TOTAL_STEPS = 6;

    let journey = useJourney<IFormTriageQuestions>(session!, TOTAL_STEPS)

    const onTriageSubmit = (e: any, value: IFormTriageQuestions) => {
        journey.setTriage(value);
        journey.onNext();
    }

    const onDoctorChosen = (e: any, value: IUser) => {
        if (journey.doctor?.id !== value.id) {
            journey.setDoctor(value)
            journey.setTimeslot(undefined);
        }

        journey.onNext();
    }

    const onTimeslotChosen = (e: any, value: ITimeslot) => {
        journey.setTimeslot(value)
        journey.onNext();
    }

    const onConfirmBooking = (e: any) => {
        journey.setPatient(session!);
        journey.submit();
        navigate("/appointments");
    }

    const onClinicSubmit = (e: any, groupId: number) => {
        journey.setGroupId(groupId);
        journey.onNext();
    }

    const getForm = () => {
        switch (journey.step) {
            case 1:
                return (<FormEmergency
                    onBack={(e) => journey.onBack()}
                    onNext={(e) => journey.onNext()} />);

            case 2:
                return (
                    <FormTriage
                        defaultValue={{
                            animal: journey.triage?.animal ?? "",
                            symptoms: journey.triage?.symptoms ?? "",
                            duration: journey.triage?.duration ?? "",
                            other: journey.triage?.other ?? "",
                        }}
                        onBack={(e) => journey.onBack()}
                        onNext={(e, value) => onTriageSubmit(e, value)}
                    />
                );
            case 3:
                return (
                    <FormSelectDoctor
                        input={data.providers.find(p => p.id === journey.groupId)!}
                        defaultValue={journey.doctor}
                        onBack={(e) => journey.onBack()}
                        onNext={(e, value) => onDoctorChosen(e, value)} />);
            case 4:
                return (<FormSelectTimeslot
                    input={journey.doctor}
                    defaultValue={journey.timeslot}
                    onBack={(e) => journey.onBack()}
                    onNext={(e, value) => onTimeslotChosen(e, value)} />);
            case 5:
                return (<FormSubmitBookingRequest
                    input={{
                        patient: journey.patient,
                        doctor: journey.doctor!,
                        provider: data.providers.find(p => p.id === journey.groupId)!,
                        timeslot: journey.timeslot!
                    }}
                    onBack={(e) => journey.onBack()}
                    onNext={(e) => onConfirmBooking(e)} />);
            default: // step == 0
                return (<FormClinic onNext={(e, value) => onClinicSubmit(e, value)} />);
        }
    }


    const onBack = (e: any) => {
        navigate('/');
    }

    return (
        <Page title="Book Appointment" onBack={(e) => onBack(e)} backLabel="Cancel">
            <Stepper totalSteps={TOTAL_STEPS} currentStep={journey.step} activeColor={theme.button_primary_background_color} inactiveColor={theme.button_secondary_background_color} />
            { getForm() }
        </Page>
    )
}
