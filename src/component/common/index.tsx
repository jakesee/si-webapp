import styled from "styled-components";
import { ITheme } from "../../interfaces/ui";
import { IJourneyHook } from "../../hooks/useJourney";

export const PageTitle = styled.h1`
    text-align: center;
    padding: 3px 6px;
`

export const Section = styled.div`
    padding: 3px 6px;
    margin: 0 12px;

    p {
        margin-bottom: 6px;
    }
`

export const WideButton = styled.button<{ theme: ITheme, color?: string, width?: string }>`
    width: ${props => props.width ?? 'auto'};
    background-color: ${props => props.color === 'primary' ? props.theme.button_primary_background_color : props.theme.button_secondary_background_color};
    color: ${props => props.color === 'primary' ? props.theme.button_primary_foreground_color : props.theme.button_secondary_foreground_color};
    border: none;
    padding: 10px;
    cursor: pointer;
`

export const FormButton = styled.button<{ theme: ITheme, color?: string }>`
    background-color: ${props => props.color == 'primary' ? props.theme.button_primary_background_color : props.theme.button_secondary_background_color};
    color: ${props => props.color == 'primary' ? props.theme.button_primary_foreground_color : props.theme.button_secondary_foreground_color};
    border: none;
    padding: 6px 12px;
    border-radius: 3px;
                                                                                                                                                                                                                                                                                                                                                                           cursor: pointer;
`

export const FormButtonNav = styled.div`

    margin-top: 50px;
    display: flex;

    .right {
        margin-left: auto;
    }
`

export const FormTitle = styled.h2`
    margin-bottom: 20px;
`


export interface FormProps<IInput, IOuput> {
    onNext: (e: any, value: IOuput) => void;
    onBack?: (e: any) => void;
    input?: IInput,
    defaultValue?: IOuput,
}
