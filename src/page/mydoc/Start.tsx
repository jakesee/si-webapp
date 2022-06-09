import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Screen } from "./Screen";
import { Stepper } from "../../component/stepper";
import { FormSymptoms } from "../../form/mydoc/FormSymptoms";
import { FormEmergency } from "../../form/mydoc/FormEmergency";
import { PageTitle } from "./Page.styled";
import { DataContext } from "../../context/DataContext";
import { FormSelectTimeslot } from "../../form/mydoc/FormSelectTimeslot";
import { FormSelectDoctor } from "../../form/mydoc/FormSelectDoctor";
import { useJourney } from "../../hooks/useJourney";

export const Start = () => {

    let navigate = useNavigate();
    let {theme, session} = useContext(DataContext);

    let TOTAL_STEPS = 4;
    let { groupId } = useParams();
    let [form, setForm] = useState(<></>)
    let journey = useJourney(session!, parseInt(groupId!), TOTAL_STEPS)

    useEffect(() => {
        switch (journey.step) {
            case 1:
                setForm(<FormSymptoms journey={journey} onBack={(e) => journey.onBack()} onNext={(e) => journey.onNext()} />);
                break;
            case 2:
                setForm(<FormSelectDoctor journey={journey} onBack={(e) => journey.onBack()} onNext={(e) => journey.onNext()} />);
                break;
            case 3:
                setForm(<FormSelectTimeslot journey={journey} onBack={(e) => journey.onBack()} onNext={(e) => journey.onNext()} />);
                break;
            default: // step == 0
                setForm(<FormEmergency journey={journey} onNext={(e) => journey.onNext()} />);
                break;
        }
    }, [journey.step])



    const onBack = (e: any) => {
        navigate('/');
    }

    return (
        <Screen onBack={(e) => onBack(e)} backLabel="Cancel">
            <PageTitle>Book Appointment</PageTitle>
            <Stepper totalSteps={TOTAL_STEPS} currentStep={journey.step} activeColor={theme.button_primary_background_color} inactiveColor={theme.button_secondary_background_color} />
            { form }
        </Screen>
    )
}
