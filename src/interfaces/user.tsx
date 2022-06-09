import { ITimeslot } from "./timeslot";

export interface IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;
  contact?: string;
  email?: string;
  imgUrl?: string;
  nationalId?: string;
  country?: string,
  city?: string,
  street?: string,
  postal?: string,
  allergy?: string,
  conditions?: string,
  medications?: string,
  emergencyContact?: string,
  emergencyPerson?: string,
  clinic?: string,
  bio?: string,
  speciality?: string[],
  availability?: ITimeslot[]

  role: UserRole
}

export enum UserRole {
  patient = 1,
  doctor = 2,
  concierge = 4,
  admin = 8
}

export class User implements IUser {

  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;
  contact?: string | undefined;
  email?: string | undefined;
  imgUrl?: string | undefined;
  nationalId?: string | undefined;
  country?: string | undefined;
  city?: string | undefined;
  street?: string | undefined;
  postal?: string | undefined;
  role: UserRole;
  allergy?: string;
  conditions?: string;
  medications?: string;
  emergencyContact?: string;
  emergencyPerson?: string;
  clinic?: string;
  bio?: string;
  speciality?: string[];
  availability?: { start: Date, end: Date }[];

  constructor(template: IUser) {
    this.id = template.id;
    this.username = template.username;
    this.password = template.password;
    this.firstName = template.firstName;
    this.lastName = template.lastName;
    this.gender = template.gender;
    this.birthdate = template.birthdate;
    this.contact = template.contact;
    this.email = template.email;
    this.imgUrl = template.imgUrl;
    this.nationalId = template.nationalId;
    this.role = template.role;
    this.country = template.country;
    this.city = template.city;
    this.street = template.street;
    this.postal = template.postal;
    this.allergy = template.allergy;
    this.conditions = template.conditions;
    this.medications = template.medications;
    this.emergencyContact = template.emergencyContact;
    this.emergencyPerson = template.emergencyPerson;
    this.clinic = template.clinic;
    this.bio = template.bio;
    this.speciality = template.speciality;
    this.availability = template.availability;
  }

  get name(): string {
      return this.firstName + " " + this.lastName;
  }
}
