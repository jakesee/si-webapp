import styled from "styled-components";


export const ChatBubble = styled.div<{ align?: 'left' | 'right', bgColor?: string, }>`
    display: flex;
    flex-direction: ${p => p.align === 'left' ? 'row' : 'row-reverse'};
    gap: 10px;


    .msg-bubble {
        background-color: ${p => p.bgColor ?? `#CBDDF6`};
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        max-width: 60%;

        .meta {
            text-align: right;
            font-size: 1em;
        }
    }
`

export const ChatBubblePortrait = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50px;
`
