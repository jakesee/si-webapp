import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { SocketContext } from "../context/SocketProvider";
import http from "../http";
import { SocketMessage } from "../http/SocketService";
import { Appointment, Episode, IAppointment, IEpisode, IMessage, Message } from "../interfaces/episode";

export const useChatRoom = (appointmentId:number) => {

    let { socket } = useContext(SocketContext);
    let { accessToken, session } = useContext(AuthContext);
    let [isLoading, setIsLoading] = useState(false);
    let [isError, setIsError] = useState(false);
    let [episode, setEpisode] = useState<Episode>();
    let [appointment, setAppointment] = useState<Appointment>();
    let [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if (!accessToken || !session || !appointmentId) return;

        setIsError(false);
        setIsLoading(true);

        http.getAppointment<IAppointment>(accessToken, session?.id, appointmentId).then((response) => {
            let _appointment = undefined;
            if (response?.OK()) {
                _appointment = new Appointment(response.data);
            }
            setAppointment(_appointment);
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })

    }, [appointmentId, accessToken, session]);


    useEffect(() => {
        if (!accessToken || !session || !appointment) return;

        setIsError(false);
        setIsLoading(true);

        http.getEpisode<IEpisode>(accessToken, appointment.episode_id).then((response) => {
            let _episode = undefined;
            if (response?.OK()) {
                _episode = new Episode(response.data);
            }
            setEpisode(_episode);
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        })

    }, [appointment, accessToken, session]);

    // load messages with episode change
    useEffect(() => {

        if (!accessToken || !episode) return;

        setIsLoading(true);
        setIsError(false);

        http.getMessages<any>(accessToken, episode?.id).then((response) => {
            let newMessages: Message[] = []
            if (response?.OK()) {
                newMessages = response.data.map(m => Message.fromAPI(m));
                newMessages = Message.sort(newMessages);
            }
            setMessages(prev => [...newMessages, ...prev])
            setIsLoading(false);
        }).catch(reason => {
            setIsError(true);
            setIsLoading(false);
        });

    }, [accessToken, episode])

    useEffect(() => {
        if (!socket || !episode) return;

        socket.onMessage = (message: SocketMessage) => {
            if (message.isEventEpisodeChat(episode!.id)) {
                let newMessage = Message.fromSocketMessage(message);
                setMessages(prev => [...prev, newMessage]);
            } else {
                console.log('unknown SocketMessage:', message)
            }
        };

    }, [socket, episode]);

    const sendChat = (message: string) => {
        if (socket && accessToken && episode && session) {
            socket.sendMessage(accessToken, episode.id, episode.chat_id_username, session.id, session.chat_id_username!, message)
        }
    }

    return {
        isLoading, isError, episode, appointment, messages, sendChat
    }
}
