import { useState } from "react";
import { ITimeslot } from "../interfaces/timeslot";
import { IUser } from "../interfaces/user";


export interface IJourneyState {
    patient: IUser,
    setPatient: React.Dispatch<React.SetStateAction<IUser>>,
    groupId: number,
    setGroupId: React.Dispatch<React.SetStateAction<number>>,
    doctor: IUser | undefined,
    setDoctor: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    timeslot: ITimeslot | undefined,
    setTimeslot: React.Dispatch<React.SetStateAction<ITimeslot | undefined>>,
    episodeId: number | undefined,
    setEpisodeId: React.Dispatch<React.SetStateAction<number | undefined>>,
    triage: string,
    setTriage: React.Dispatch<React.SetStateAction<any>>,
    step: number,
    onNext: () => void,
    onBack: () => void
}

export const useJourney = (user: IUser, _groupId: number, totalSteps: number): IJourneyState  => {

    let [patient, setPatient] = useState(user);
    let [groupId, setGroupId] = useState(_groupId);
    let [doctor, setDoctor] = useState<IUser>();
    let [timeslot, setTimeslot] = useState<ITimeslot>();
    let [episodeId, setEpisodeId] = useState<number>();
    let [triage, setTriage] = useState<any>();
    let [step, setStep] = useState(0);

    const onNext = () => {
        if (step + 1 < totalSteps) setStep(step + 1);
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
        step, onNext, onBack
    }
}
