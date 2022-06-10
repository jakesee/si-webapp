import { useState } from "react";
import { ITimeslot } from "../interfaces/timeslot";
import { IUser } from "../interfaces/user";


export interface IJourneyState {
    patient: IUser,
    groupId: number,
    doctor: IUser | undefined,
    timeslot: ITimeslot | undefined,
    episodeId: number | undefined,
    triage: any,
    step: number,
}

export interface IJourneyHook extends IJourneyState {
    setPatient: React.Dispatch<React.SetStateAction<IUser>>,
    setGroupId: React.Dispatch<React.SetStateAction<number>>,
    setDoctor: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    setTimeslot: React.Dispatch<React.SetStateAction<ITimeslot | undefined>>,
    setEpisodeId: React.Dispatch<React.SetStateAction<number | undefined>>,
    setTriage: React.Dispatch<React.SetStateAction<any>>,
    onNext: () => void,
    onBack: () => void,
    onFinished: (journey: IJourneyState) => void
}

export const useJourney = (user: IUser, _groupId: number, totalSteps: number, onFinished: (journey: IJourneyState) => void): IJourneyHook  => {

    let [patient, setPatient] = useState(user);
    let [groupId, setGroupId] = useState(_groupId);
    let [doctor, setDoctor] = useState<IUser>();
    let [timeslot, setTimeslot] = useState<ITimeslot>();
    let [episodeId, setEpisodeId] = useState<number>();
    let [triage, setTriage] = useState<any>();
    let [step, setStep] = useState(0);

    const onNext = () => {
        if (step + 1 < totalSteps) setStep(step + 1);
        else onFinished({
            patient, groupId, doctor, timeslot, episodeId, triage, step
        })
    }

    const onBack = () => {
        if (step > 0) setStep(step - 1);
    }

    return {
        patient, setPatient,
        groupId, setGroupId,
        doctor, setDoctor,
        timeslot, setTimeslot,
        episodeId, setEpisodeId,
        triage, setTriage,
        step, onNext, onBack, onFinished
    }
}
