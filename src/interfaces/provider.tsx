import { ISection } from "./ui";

export interface IProvider {
    id: number;
    parentId: number,
    order: 0,
    title: string;
    logoUrl: string,
    description: string;
    category: string;
    isMemberRequired: boolean,
    sections: Array<ISection>;
    journey?: {
        start: IJourney,
        [key: string]: IJourney
    },
    doctorIds: number[]
}

export interface IEligibility {
    id: number,
    providerId: number,
    fieldName: number,
    fieldValue: number
}

export interface IJourney {
    auth: boolean
    label: string,
    cmdCancel: any;
    cmdSuccess: any;
    sequence: Array<ISequenceItem>;
}

export interface ISequenceItem {
    stepName: string;
    component: string;
    config: any;
}
