import Generator from "../utils/Generator";
import { ITimeslot } from "./timeslot";

export interface IUser {
  id: number;
  username: string;
  password: string;
  title: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: Date;
  contact?: string;
  email?: string;
  image_url?: string;
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
  langauges?: string[],
  availability?: ITimeslot[],
  role: UserRole,
  is_test: boolean;
  chat_id_username?: string;

  // fields returned from api
  extras?: any[]
}

export enum UserRole {
  patient = 1,
  doctor = 2,
  concierge = 4,
  admin = 8
}

export class User implements IUser {

  id!: number;
  username!: string;
  password!: string;
  title!: string;
  first_name!: string;
  last_name!: string;
  gender!: string;
  birthdate!: Date;
  contact?: string | undefined;
  email?: string | undefined;
  image_url?: string | undefined;
  nationalId?: string | undefined;
  country?: string | undefined;
  city?: string | undefined;
  street?: string | undefined;
  postal?: string | undefined;
  role!: UserRole;
  allergy?: string;
  conditions?: string;
  medications?: string;
  emergencyContact?: string;
  emergencyPerson?: string;
  clinic?: string;
  bio?: string;
  speciality?: string[];
  availability?: { start: Date, end: Date }[];
  is_test: boolean = false;
  extras?: any[];
  chat_id_username?: string;

  constructor(template: IUser) {
    let birthdate = !template.birthdate ? undefined : new Date(template.birthdate);
    let image_url = template.image_url ?? Generator.randomPortraitUrl(template.gender === 'Male');
    let langauges = template.extras?.filter(e => e.type === 'language').map(extra => extra.value)
    let speciality = template.extras?.filter(e => e.type === 'specialty').map(extra => extra.value)
    let bio = template.extras?.filter(e => e.type === 'statement').map(extra => extra.value).join('. ');
    let is_test = template.extras?.filter(e => e.type === 'is_test').map(extra => extra.value).shift() ?? false;
    let clinic = (template as any).addresses ? (template as any).addresses[0] ? (template as any).addresses[0].label ?? undefined : undefined : undefined;

    Object.assign(this, {
      ...template,
      birthdate, image_url, langauges, speciality, bio, is_test, clinic
    });
  }

  get name(): string {
      return this.first_name + " " + this.last_name;
  }
}
