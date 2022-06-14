import styled from "styled-components"
import { ITheme } from "../../interfaces/ui"


const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.54);

    display: flex;
    align-items: center;
    justify-items: center;
`


const Spinner = styled.div<{theme:ITheme}>`
    border: 5px solid ${p => p.theme.button_secondary_background_color ?? `#ffffff`};
    border-top: 5px solid ${p => p.theme.button_primary_background_color ?? `#83B0E9`};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export const Loader = ({ theme }: { theme?: ITheme }) => {
    return (
        <Wrapper>
            <Spinner theme={theme}/>
        </Wrapper>
    )
}
