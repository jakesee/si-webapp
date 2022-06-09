import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Screen } from "./Screen";
import { Stepper } from "../../component/stepper";
import { FormSymptoms } from "../../form/mydoc/FormSymptoms";
import { FormEmergency } from "../../form/mydoc/FormEmergency";
import { PageTitle } from "./Page.styled";
import { DataContext } from "../../context/DataContext";

export const Start = () => {

    let navigate = useNavigate();
    let {theme} = useContext(DataContext);

    let { groupId } = useParams();
    let TOTAL_STEPS = 3;
    let [title, setTitle] = useState('');
    let [form, setForm] = useState(<></>)
    let [step, setStep] = useState(0);
    useEffect(() => {
        switch (step) {
            case 1:
                setTitle("Symptoms");
                setForm(<FormSymptoms step={1} onBack={(e, step) => onFormBack(e, step)} onNext={(e, step, data) => onFormNext(e, step, data)} />);
                break;
            case 2:
                setTitle("Appointment");
                setForm(<FormSymptoms step={2} onBack={(e, step) => onFormBack(e, step)} onNext={(e, step, data) => onFormNext(e, step, data)} />);
                break;
            default: // step == 0
                setTitle("Emergency Questions")
                setForm(<FormEmergency step={0} onNext={(e, step, data) => onFormNext(e, step, data)} />);
                break;
        }
    })



    const onBack = (e: any) => {
        navigate('/');
    }

    const onFormNext = (e: any, step: number, data: any) => {
        if (step < TOTAL_STEPS - 1) setStep(step + 1);
    }

    const onFormBack = (e: any, step: number) => {
        if (step > 0) setStep(step - 1);
    }

    return (
        <Screen onBack={(e) => onBack(e)} backLabel="Cancel">
            <PageTitle>Book Appointment</PageTitle>
            <Stepper totalSteps={TOTAL_STEPS} currentStep={step} activeColor={theme.button_primary_background_color} inactiveColor={theme.button_secondary_background_color} />
            { form }
        </Screen>
    )
}
