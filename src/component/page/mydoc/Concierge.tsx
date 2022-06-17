import React, { ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../control/Page";

import { format } from "date-fns";
import { AppContext } from "../../../context/AppContext";
import { ChatControl } from "../../control/ChatControl";
import { EpisodeType, IMessage } from "../../../interfaces/episode";
import { ChatBubble, ChatBubblePortrait } from "../../control/ChatBubble";
import { User } from "../../../interfaces/user";


export const Concierge = () => {

    const navigate = useNavigate();

    const { theme, data, session } = useContext(AppContext);

    let userEpisodes = data.episodes.filter(e => e.type === EpisodeType.CallCentre && e.participants.map(p => p.id).includes(session!.id));
    userEpisodes = userEpisodes.sort((a, b) => b.id - a.id);

    const episode = userEpisodes ? userEpisodes[0] : undefined;

    const [messages] = useState<IMessage[]>(episode ? episode.messages : [])

    const onSendMessage = (e:any) => {

    }

    const onAttachFile = (e: any) => {

    }

    const onRenderChatMessage = (message: IMessage, index: number, color: (ref: string) => string): ReactNode => {

        // current user's message will align right, all others will align left.
        let align: 'left' | 'right' = 'left';
        let bgColor = undefined;
        if (message.userId === session?.id) {
            align = 'right';
            bgColor = `#B2E4E7`;
        } else {
            bgColor = `#ffffff`;
        }

        let sender = new User(data.users.find(u => u.id === message.userId)!);

        return (
            <ChatBubble key={index} align={align} bgColor={bgColor}>
                <div className="msg-bubble">
                    <div className="name" style={{ color: color(sender.name) }}>{sender.name}</div>
                    <div className="msg"><p>{message.message}</p></div>
                    <div className="meta">{format(message.datetime, "yyyy-mm-dd HH:mm")}</div>
                </div>
            </ChatBubble>
        )
    }

    return (
        <Page title="Concierge Helpdesk" onBack={() => navigate('/')} backLabel="Dashboard" isScrollable={false}>
            <ChatControl
                theme={theme}
                messages={messages}
                onSend={(e) => onSendMessage(e)}
                onAttach={(e) => onAttachFile(e)}
                onRenderMessage={(message, index, color) => onRenderChatMessage(message, index, color)}
            >
            </ChatControl>
        </Page>
    )
}
