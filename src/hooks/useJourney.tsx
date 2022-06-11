import { useState } from "react";
import { ITimeslot } from "../interfaces/timeslot";
import { IUser } from "../interfaces/user";


export interface IJourneyState<T> {
    patient: IUser,
    groupId: number | undefined,
    doctor: IUser | undefined,
    timeslot: ITimeslot | undefined,
    episodeId: number | undefined,
    appointmentId: number | undefined,
    triage: T | undefined,
    step: number,
}

export interface IJourneyHook<T> extends IJourneyState<T> {
    setPatient: React.Dispatch<React.SetStateAction<IUser>>,
    setGroupId: React.Dispatch<React.SetStateAction<number | undefined>>,
    setDoctor: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    setTimeslot: React.Dispatch<React.SetStateAction<ITimeslot | undefined>>,
    setEpisodeId: React.Dispatch<React.SetStateAction<number | undefined>>,
    setTriage: React.Dispatch<React.SetStateAction<T | undefined>>,
    setAppointmentId: React.Dispatch<React.SetStateAction<number | undefined>>,
    onNext: () => void,
    onBack: () => void,
    onFinished: (journey: IJourneyState<T>) => void
}

export const useJourney = <T,>(user: IUser, totalSteps: number, onFinished: (journey: IJourneyState<T>) => void): IJourneyHook<T>  => {

    let [step, setStep] = useState(0);
    let [patient, setPatient] = useState(user);
    let [groupId, setGroupId] = useState<number>();
    let [doctor, setDoctor] = useState<IUser>();
    let [timeslot, setTimeslot] = useState<ITimeslot>();
    let [episodeId, setEpisodeId] = useState<number>();
    let [appointmentId, setAppointmentId] = useState<number>();
    let [triage, setTriage] = useState<T>();

    const onNext = () => {
        if (step + 1 < totalSteps) setStep(step + 1);
        else onFinished({
            patient, groupId, doctor, timeslot, episodeId, step, triage, appointmentId
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
        appointmentId, setAppointmentId,
        step, onNext, onBack, onFinished
    }
}
