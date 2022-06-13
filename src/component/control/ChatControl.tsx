import React, { ReactNode, useRef, useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";
import { ITheme } from "../../interfaces/ui";

const Wrapper = styled.div`
    height: 100%;
    overflow: hidden;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr min-content;
`
const Content = styled.div`
    background-color: #F8F9F9;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 20px;
`

const ControlBar = styled.div`
    padding: 10px 10px 20px 10px;

    display: flex;
    gap: 5px;
    align-items: center;
`

const ChatInput = styled.div`
    padding: 6px 15px 6px 15px;
    background-color: #F5F6F7;
    flex: 1;
    border-radius: 20px;
    align-items: center;

    display: flex;
    gap: 5px;

    input {
        flex: 1;
        border: none;
        background: none;
        outline: none;
        padding: 0;
    }
`

export interface ChatControlProps<T> {
    theme: ITheme,
    messages: T[],
    onRenderMessage: (message: T, index: number, color: (ref:string) => string) => ReactNode,
    onSend: (e: any, message: string) => void,
    onAttach?: (e: any) => void,
    onStartVideo?: (e: any) => void,
    isVideoReady?: boolean,
    children?: ReactNode,
}

export const ChatControl = <T,>({ children, theme, onStartVideo, isVideoReady = false, messages, onRenderMessage, onSend, onAttach, }: ChatControlProps<T>) => {

    const muiIconSx = { fontSize: "2.1em", color: `rgba(0, 0, 0, 0.54)` }

    let inputFile = useRef<HTMLInputElement>(null);

    let [message, setMessage] = useState("")

    const toColor = (ref: string) => {
        let hash = 0;
        for (let i = 0; i < ref.length; i++) {
            hash = ref.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substring(-1);
        }
        return colour;
    }

    const onSendMessage = (e: any, message: string) => {
        onSend(e, message);
        // clear the message after sending
        setMessage("");
    }

    const onInputKeydown = (e: any) => {
        if (e.key === 'Enter') {
            onSendMessage(e, message);
        }
    }

    const onAttachFile = (e: any) => {

        inputFile.current?.click();

        onAttach && onAttach(e);
    }

    const onImageChange = (e:any) => {
        if (e.target.files && e.target.files[0]) {
            console.log(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <Wrapper>
            <Content>
                { children }
                {messages.map((m, i) => onRenderMessage(m, i, toColor)) }
            </Content>
            <ControlBar>
                {onStartVideo && <VideoCameraFrontIcon sx={{ ...muiIconSx, color: isVideoReady ? theme.button_primary_background_color : undefined }} onClick={(e) => onStartVideo(e)} />}
                <ChatInput>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => onInputKeydown(e) }/>
                    {onAttach && <AttachFileIcon sx={muiIconSx} onClick={(e) => onAttachFile(e)} />}
                </ChatInput>
                <SendIcon sx={muiIconSx} onClick={(e) => onSendMessage(e, message)} />
                <input type="file" id="file" ref={inputFile} onChange={ (e) => onImageChange(e) } style={{display: "none" }} />
            </ControlBar>
        </Wrapper>
    )
}
