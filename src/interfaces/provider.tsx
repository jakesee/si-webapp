import { ISection } from "./ui";

export interface IProvider {
    id: number;
    parentId: number,
    order: 0,
    name: string;
    logo: string,
    description: string;
    category: string;
    isMemberRequired: boolean,
    sections: Array<ISection>;
    journey?: {
        start: IJourney,
        [key: string]: IJourney
    },
    doctorIds: number[],
    consultation_duration: number,
    settings?: { [key: string]: any; }
}

export class Provider implements IProvider {
    id!: number;
    parentId!: number;
    order!: 0;
    name!: string;
    logo!: string;
    description!: string;
    category!: string;
    isMemberRequired!: boolean;
    sections!: ISection[];
    journey?: { [key: string]: IJourney; start: IJourney; };
    doctorIds!: number[];
    consultation_duration!: number;
    settings?: { [key: string]: any; };

    constructor(template: IProvider) {

        let consultation_duration = (template as any).settings.consultation_duration as number ?? 15

        Object.assign(this, {
            ...template,
            consultation_duration
        })
    }
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
