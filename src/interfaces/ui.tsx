import { IProvider } from "./provider";

export interface IAppConfig {
    providerId: number;
    theme: ITheme;
    logoUrl: string;
    menuItems: Array<IMenuItem>;
    pageStyle: IPageStyle;
    header: ISection;
    footer: ISection;
    sections: Array<ISection>;
}

export enum Language {
    en,
    vi,
    th,
    zh_CN,
    zh_HK,
    zh_Hant_TW,
    es,
    ms,
}

export interface ITheme {
    // body
    "font_family": string;

    "color_background": string;
    "color_on_background": string;
    "color_surface": string;
    "color_on_surface": string;

    // theme colors
    "color_neutral__2": string;
    "color_neutral__1": string;
    "color_neutral_0": string;
    "color_neutral_1": string;
    "color_neutral_2": string;

    "color_on_neutral__2": string;
    "color_on_neutral__1": string;
    "color_on_neutral_0": string;
    "color_on_neutral_1": string;
    "color_on_neutral_2": string;

    "color_primary__2": string;
    "color_primary__1": string;
    "color_primary_0": string;
    "color_primary_1": string;
    "color_primary_2": string;

    "color_on_primary__2": string;
    "color_on_primary__1": string;
    "color_on_primary_0": string;
    "color_on_primary_1": string;
    "color_on_primary_2": string;

    "color_secondary__2": string;
    "color_secondary__1": string;
    "color_secondary_0": string;
    "color_secondary_1": string;
    "color_secondary_2": string;

    "color_on_secondary__2": string;
    "color_on_secondary__1": string;
    "color_on_secondary_0": string;
    "color_on_secondary_1": string;
    "color_on_secondary_2": string;

    // header/footer
    "header_background_color": string;
    "footer_background_color": string;

    // box
    "box_border_radius": string;

    "error_border_color": string,
    "error_background_color": string;
    "error_foreground_color": string;

    "warning_border_color": string,
    "warning_background_color": string;
    "warning_foreground_color": string;

    "info_border_color": string,
    "info_background_color": string;
    "info_foreground_color": string;

    "note_border_color": string,
    "note_background_color": string;
    "note_foreground_color": string;

    "success_border_color": string,
    "success_background_color": string;
    "success_foreground_color": string;

    // buttons
    "button_border_radius": string;
    "button_primary_border_color": string;
    "button_primary_background_color": string;
    "button_primary_foreground_color": string;
    "button_secondary_border_color": string;
    "button_secondary_background_color": string;
    "button_secondary_foreground_color": string;
    "button_primary_inactive_border_color": string;
    "button_primary_inactive_background_color": string;
    "button_primary_inactive_foreground_color": string;
    "button_secondary_inactive_border_color": string;
    "button_secondary_inactive_background_color": string;
    "button_secondary_inactive_foreground_color": string;
}

export interface IMenuItem {
    text: string;
    routerLink: string;
    icon: Array<string>;
    display: { public: boolean, private: boolean };
}

export interface ISection {
    component: string;
    config: any;
}

export interface IPageStyle {
    container: PageStyleContainerEnum;
    content: PageStyleContentEnum;
}

export enum PageStyleContainerEnum {
    fluidContainer = 'wh_fluid_container',
    container = 'wh_container',
}
export enum PageStyleContentEnum {
    contentCenter = 'wh_content_center',
    contentLeft = 'wh_content_left',
}

export class Section {

    provider: IProvider = {} as IProvider;

    init(config: any, provider: IProvider): void {
        Object.assign(this, config);
        this.provider = provider;
    }
}
