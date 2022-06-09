import styled from "styled-components";
import { ITheme } from "../../interfaces/ui";

export const PageTitle = styled.h1`
    margin: 10px auto 10px auto;
    text-align: center;
    padding: 6px;
`

export const PageSection = styled.div`
    padding: 6px;

    p {
        margin-bottom: 6px;
    }
`

export const PageLargeButton = styled.button<{theme:ITheme, color?: string, width?: string}>`
    width: ${props => props.width ?? 'auto' };
    background-color: ${props => props.color === 'primary' ? props.theme.button_primary_background_color : props.theme.button_secondary_background_color};
    color: ${props => props.color ==='primary' ? props.theme.button_primary_foreground_color : props.theme.button_secondary_foreground_color};
    border: none;
    padding: 10px;
    cursor: pointer;
`

export const PageButton = styled.button<{ theme: ITheme, color?: string }>`
    background-color: ${props => props.color == 'primary' ? props.theme.button_primary_background_color : props.theme.button_secondary_background_color};
    color: ${props => props.color == 'primary' ? props.theme.button_primary_foreground_color : props.theme.button_secondary_foreground_color};
    border: none;
    padding: 6px 12px;
    border-radius: 3px;
                                                                                                                                                                                                                                                                                                                                                                           cursor: pointer;
`
