import { IAppointment, IEpisode } from "./episode";
import { IProvider } from "./provider";
import { ICasenote, ICasenoteRevision, IIcd10, IMedicalCertificate, IPrescription, IReferral } from "./records";
import { IUser } from "./user";

export interface IDatabase {
    users: IUser[];
    providers: IProvider[];
    appointments: IAppointment[];
    episodes: IEpisode[];
    casenotes: ICasenote[];
    casenoteRevisions: ICasenoteRevision[],
    prescriptions: IPrescription[];
    referrals: IReferral[];
    medicalCertificates: IMedicalCertificate[];
    icd10: IIcd10[];
}
