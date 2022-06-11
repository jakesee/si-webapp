import styled from "styled-components"
import { ITheme } from "../../interfaces/ui"

export const Spinner = styled.div<{theme:ITheme}>`
    border: 5px solid ${p => p.theme.button_secondary_background_color};
    border-top: 5px solid ${p => p.theme.button_primary_background_color};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
}
`
