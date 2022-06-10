import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    :root {

    }

    * {
        padding: 0; margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        background-color: #ffffff;
        font-family: "Prompt", "Univers Next Pro", sans-serif !important;
    }

    body {
        font-size: 1em;
    }

    div, span {
        font-size: 1em;
    }

    p, li, button, input, option, select, label {
        font-family: "Prompt", "Univers Next Pro", sans-serif !important;
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
