import { ConstructionOutlined } from "@mui/icons-material";
import { IProvider } from "./provider";
import { IUser, User, UserRole } from "./user";

export enum MessageType {
    Message = 1,
    Json = 2,
    Appointment = 3,
    Laboratory = 4,
    Referral = 5
}

export interface IMessage {
    userId: number;
    message: string;
    datetime: Date;
    type: MessageType;
}

export enum EpisodeStatus {
    Opened = 'open',
    Closed = 'close'
}

export enum EpisodeType {
    BotConvo = 'botconvo', // - Bot to Patient(default episode for each patient)
    CallCentre = 'callcenter', // - Concierge to Patient
    Diary = 'diary', // Patient to Professional
    Group = 4, // concierge to Professional
    HealthScreening = 5, // - Healthscreening episode to Patient
    PeerToPeer = 6, // - Professional to Professional
}

export interface IEpisode {
    id: number;
    participants: IUser[];
    providerId: number;
    messages: IMessage[];
    status: EpisodeStatus,
    type: EpisodeType,
    created_at: Date,
    chat_id_username: string
}

export interface IAppointment {
    id: number;
    episode_id: number;
    start_at: Date;
    end_at: Date;
    status: AppointmentStatus,
    created_at: Date,

    // additional fields returned by api
    group_id?: number;
    group_name?: string;
    doctor?: IUser;
    duration?: number
}

export class Episode implements IEpisode {

    id!: number;
    providerId!: number;
    status!: EpisodeStatus;
    type!: EpisodeType;
    participants!: IUser[];
    messages!: IMessage[];
    created_at: Date = new Date();
    chat_id_username: string = "";

    constructor(template: IEpisode) {
        console.log('Episode', template);

        let created_at = new Date(template.created_at);

        Object.assign(this, {
            ...template,
            created_at
        })
    }
}

export class Message implements IMessage {
    userId: number;
    message: string;
    datetime: Date;
    type: MessageType;

    constructor(template: IMessage, public user: User) {
        this.userId = template.userId;
        this.message = template.message;
        this.datetime = template.datetime;
        this.type = template.type;
    }

}

export enum AppointmentStatus {
    Pending = "pending",
    Accepted = 2,
    Rejected = 3,
    Completed = 4,
    Timeout = 5,
}

export class Appointment implements IAppointment {
    id!: number;
    episode_id!: number;
    start_at!: Date;
    end_at!: Date;
    status!: AppointmentStatus;
    patient?: User;
    doctor?: User;
    created_at: Date = new Date();
    group_name?: string;
    group_id?: number;
    duration?: number;

    constructor(template: IAppointment) {

        let duration = template.duration ?? 15;
        let created_at = new Date(template.created_at!);
        let start_at = new Date(template.start_at!)
        let end_at = new Date(start_at.getTime() + duration * 60 * 60 * 1000);
        let _template = (template as any)?.doctor?.doctor?.account ?? null;
        let doctor = _template ? new User(_template) : undefined;

        Object.assign(this, {
            ...template,
            created_at, start_at, end_at, duration, doctor
        });
    }

    isUpcoming(): boolean {
        let active = [AppointmentStatus.Pending, AppointmentStatus.Accepted]
        return active.includes(this.status);
    }

    getAppointmentStatusLabel(episodeStatus: EpisodeStatus) {

        if (episodeStatus === EpisodeStatus.Closed) return "Completed";
        if (this.status === AppointmentStatus.Accepted) return "Confirmed";
        if (this.status === AppointmentStatus.Rejected) return "Cancelled";
        if (this.status === AppointmentStatus.Timeout) return "Cancelled";
        if (this.status === AppointmentStatus.Completed) return "Consulted";
        return "Pending Confirmation";

    }
}
