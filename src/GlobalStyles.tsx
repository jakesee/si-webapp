import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {

    }

    * {
        padding: 0; margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 12pt;
        font-family: "Univers Next Pro", sans-serif !important;
    }

    body {
        background-color: #ffffff;
        font-size: 1em;
    }

    h1 {
        font-size: 1.6em;
    }

    h2 {
        font-size: 1.4em;
    }

    h3 {
        font-size: 1.2em;
    }

    h4 {
        font-size: 1.0em;
    }




`
