import EventEmitter from "events";
import React, { useEffect, useState } from "react";
import { SocketEvent, SocketMessage, SocketService } from "../http/SocketService";




export const useSocket = (accessToken: string, episodeId: number) => {



    let [socket, setSocket] = useState<SocketService>();



    useEffect(() => {

        if (!accessToken) return;

        let service = new SocketService(accessToken, episodeId, episodeId);
        // Get all the old messages
        // Append old messages to SocketService messages

        service.eventEmitter.addListener(SocketEvent.MESSAGE_RECEIVED, (newMessage: SocketMessage) => {
            console.log(newMessage.payload);
        })


        setSocket(service);

    }, [accessToken])

    return {}
}
