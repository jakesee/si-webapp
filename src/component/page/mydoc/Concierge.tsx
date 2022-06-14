import React, { ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../control/Page";

import { format } from "date-fns";
import { AppContext } from "../../../context/AppProvider";
import { ChatControl } from "../../control/ChatControl";
import { EpisodeType, IMessage } from "../../../interfaces/episode";
import { ChatBubble, ChatBubblePortrait } from "../../control/ChatBubble";
import { AuthContext } from "../../../context/AuthProvider";


export const Concierge = () => {

    const navigate = useNavigate();

    const { session } = useContext(AuthContext);
    const { theme, data } = useContext(AppContext);

    let userEpisodes = data.episodes.filter(e => e.type === EpisodeType.CallCentre && e.participants.map(p => p.id).includes(session!.id));
    userEpisodes = userEpisodes.sort((a, b) => b.id - a.id);

    const episode = userEpisodes ? userEpisodes[0] : undefined;

    const [messages] = useState<IMessage[]>(episode ? episode.messages : [])

    const onSendMessage = (e:any) => {

    }

    const onAttachFile = (e: any) => {

    }

    const onRenderChatMessage = (message: IMessage, index: number): ReactNode => {

        // current user's message will align right, all others will align left.
        let align: 'left' | 'right' = 'left';
        let bgColor = undefined;
        if (message.userId === session?.id) {
            align = 'right';
            bgColor = `#B2E4E7`;
        }

        return (
            <ChatBubble key={index} align={align} bgColor={bgColor}>
                <ChatBubblePortrait src={data.users.find(u => u.id === message.userId)?.image_url} />
                <div className="msg-bubble">
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
                onRenderMessage={(message, index) => onRenderChatMessage(message, index)}
            >
            </ChatControl>
        </Page>
    )
}
