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
        font-family: "Univers Next Pro", sans-serif !important;
    }

    body {
        font-size: 1em;
    }

    div, span {
        font-size: 1em;
    }

    p, li, button, input, option, select {
        font-size: 1.4em;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.8em;
    }

    h3 {
        font-size: 1.6em;
    }

    h4 {
        font-size: 1.4em;
    }




`
