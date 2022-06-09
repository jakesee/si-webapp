export interface IMedicalCertificate {
    id: number,
    episodeId: number,
    doctorId: number,
    patientId: number,
    groupId: number,
    reason: string,
    issueDate: Date,
    startDate: Date,
    endDate: Date
}

export interface IIcd10 {
    id: number,
    parentId: number,
    level: number,
    code: string,
    desc: string
};

export interface ICasenote {
    id: number,
    episodeId: number,
    patientId: number,
    doctorId: number
}

export enum ConsultedFor {
    None = 1,
    Self = 2,
    Parent = 3,
    Spouse = 4,
    Child = 5
}

export interface ICasenoteRevision {
    id: number,
    casenoteId: number,
    consultFor: ConsultedFor,
    patientNote: string,
    doctorNote: string,
    gpVisit: boolean,
    aeVisit: boolean,
    specialistReferred: string,
    mydocReferred: string,
    alliedHealthReferred: string,
    prescription: boolean,
    followup: Date,
    complaints: string,
    createdAt: Date
}

export interface IPrescription {
    id: number,
    episodeId: number,
    doctorId: number,
    patientId: number,
    filename: string,
}

export interface IReferral {
    id: number,
    messageId: number,
    referrerId: number,
    refereeId: number,
    patientId: number,
    uploadId: number,
    patientIdentityId: string,
    birthdate: Date,
    patientName: string,
    patientEmail: string,
    contact: string,
    notes: string,
    patientConsented: string,
    createdAt: Date,
    updateAt: Date,
    deletedAt: Date,
    acceptedAt: Date
}
