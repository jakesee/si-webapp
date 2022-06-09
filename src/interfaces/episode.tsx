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
    Opened = 'Opened',
    Closed = 'Closed'
}

export enum EpisodeType {
    BotConvo = 1, // - Bot to Patient(default episode for each patient)
    CallCentre = 2, // - Concierge to Patient
    Diary = 3, // Patient to Professional
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
    type: EpisodeType
}

export interface IAppointment {
    id: number;
    episodeId: number;
    startAt: Date;
    endAt: Date;
    status: AppointmentStatus,
}

export class Episode implements IEpisode {

    id: number;
    providerId: number;
    status: EpisodeStatus;
    type: EpisodeType;

    constructor(episode: IEpisode,
        public appointments: IAppointment[],
        public provider: IProvider,
        public messages: Message[],
        public participants: User[]
    ) {
        this.id = episode.id;;
        this.providerId = episode.providerId;
        this.status = episode.status;
        this.type = episode.type;
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
    New = 1,
    Accepted = 2,
    Rejected = 3,
    Completed = 4,
    Timeout = 5,
}

export class Appointment implements IAppointment {
    id: number;
    episodeId: number;
    startAt: Date;
    endAt: Date;
    status: AppointmentStatus;
    patient: User | null;
    doctor: User | null;

    constructor(template: IAppointment, public episode: Episode) {
        this.id = template.id;
        this.episodeId = template.episodeId;
        this.startAt = template.startAt;
        this.endAt = template.endAt;
        this.status = template.status;

        this.patient = episode.participants.find(p => p.role === UserRole.patient) ?? null;
        this.doctor = episode.participants.find(p => p.role === UserRole.doctor) ?? null;
    }
}
