import { createGlobalStyle } from "styled-components";
import { ITheme } from "./interfaces/ui";

export const GlobalStyles = createGlobalStyle<{theme: ITheme}>`

    :root {
        font-size: 62.5%;
        background-color: #ffffff;
        font-family: ${props => props.theme.font_family };
    }

    :root, #root, body {
        height: 100%
    }

    * {
        padding: 0; margin: 0;
        box-sizing: border-box;
    }

    body {
        font-size: 1em;
    }

    div, span {
        font-size: 1em;
    }

    p, li, button, input, option, select, label {
        font-family: ${props => props.theme.font_family };
        font-size: 1.4em;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 10px;
    }

    h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 1.6em;
        margin-bottom: 10px;
    }

    h4 {
        font-size: 1.4em;
        margin-bottom: 10px;
    }




`
