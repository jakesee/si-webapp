import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppointments } from "../../../hooks/useAppointments";
import { InfoBox } from "../../control/InfoBox";
import { Page } from "../../control/Page";

import { format } from "date-fns";
import { AppContext } from "../../../context/AppProvider";
import { Dialog } from "../../control/Dialog";
import { ChatControl } from "../../control/ChatControl";
import { AppointmentStatus, IMessage } from "../../../interfaces/episode";
import { ChatBubble, ChatBubblePortrait } from "../../control/ChatBubble";
import { AuthContext } from "../../../context/AuthProvider";
import { useChatRoom } from "../../../hooks/useChatRoom";
import { Loader } from "../../control/Loader";



const AppointmentDetails = styled.div`
    font-size: 1.4em;
    margin-bottom: 20px;

    table tr td {
        padding: 0px 6px;
    }
`

const BookingInfo = styled.ul`

    margin-left: 10px;

    li {
        margin-left: 10px;
    }
`



export const ConsultationRoom = () => {

    const navigate = useNavigate();
    const { appointmentId } = useParams();

    let { isLoading, isError, appointment, episode } = useChatRoom(parseInt(appointmentId!))

    const { session } = useContext(AuthContext);
    const { theme, data } = useContext(AppContext);

    const [showVideoNotReadyDialog, setShowVideoNotReadyDialog] = useState(false);
    const [showVideoReadyDialog, setShowVideoReadyDialog] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);


    const [messages] = useState<IMessage[]>([])

    const onStartVideo = () => {
        if (isVideoReady)
            setShowVideoReadyDialog(true);
        else
            setShowVideoNotReadyDialog(true);
    }

    const hideAllDialogs = () => {
        setShowVideoNotReadyDialog(false);
        setShowVideoReadyDialog(false);
    }

    const onSendMessage = (e:any, message: string) => {
        if (message === 'start call now!') {
            setShowVideoReadyDialog(true);
            setIsVideoReady(true);
        } else if (message === 'stop call now!') {
            setIsVideoReady(false);
        }
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
        }

        return (
            <ChatBubble key={index} align={align} bgColor={bgColor}>
                <ChatBubblePortrait src={data.users.find(u => u.id === message.userId)?.image_url} />
                <div className="msg-bubble">
                    <div className="msg"><p>{message.message}</p></div>
                    <div className="meta">{format(message.datetime, "yyyy-MM-dd HH:mm")}</div>
                </div>
            </ChatBubble>
        )
    }

    return (
        <Page title={isVideoReady ? "Consultation Room" : "Waiting Room"} onBack={() => navigate('/')} backLabel="Dashboard" isScrollable={false}>
            {isLoading && <Loader theme={theme} />}
            {showVideoNotReadyDialog && (
                <Dialog theme={theme} title="Video is not ready." onOK={(e) => hideAllDialogs()}>
                    <p>The doctor is currently busy. You will be able to join the video call when the doctor is ready at the appointment time.</p>
                </Dialog>
            )}
            {showVideoReadyDialog && (
                <Dialog theme={theme} title="Do you want to start video call now?" onOK={(e) => hideAllDialogs()} onCancel={(e) => hideAllDialogs() }>
                    <p>The doctor has enabled the video call.</p>
                </Dialog>
            )}
            <ChatControl
                theme={theme}
                messages={messages}
                onSend={(e, message) => onSendMessage(e, message)}
                onRenderMessage={(message, index, color) => onRenderChatMessage(message, index, color)}
                onStartVideo={(e) => onStartVideo()}
                onAttach={(e) => onAttachFile(e) }
                isVideoReady={isVideoReady}
            >
                {!appointment ? <p>There is no upcoming appointment.</p> :
                    <>
                        <h3>Appointment Details</h3>
                        <AppointmentDetails>
                            <table>
                                <tbody>
                                    <tr><td>Status</td><td>{appointment.status}</td></tr>
                                    <tr><td>Episode Id</td><td>{appointment.episode_id}</td></tr>
                                    <tr><td>Specialisation</td><td>{appointment.group_name}</td></tr>
                                    <tr><td>Doctor</td><td>{`${appointment.doctor?.first_name} ${appointment.doctor?.last_name}`}</td></tr>
                                    <tr><td>Clinic</td><td>{appointment.doctor?.clinic}</td></tr>
                                    <tr><td>Date/Time</td><td>{`${format(appointment.start_at, "dd MMM yyyy, HH:mm")} - ${format(appointment.end_at, "HH:mm")}`}</td></tr>
                                </tbody>
                            </table>
                        </AppointmentDetails>
                        <InfoBox type="Info" title={<h4 style={{ margin: 0 }}>Before your appointment:</h4>}>
                            <BookingInfo>
                                <li>Arrive at least 2 minutes before your consultation time.</li>
                                <li>You will be able to start the video call when the doctor is ready.</li>
                                <li>Have your identification documents ready for verification by the attending doctor.</li>
                                <li>Feel free to upload any images or documents you would like to share with the doctor.</li>
                                <li>Missed appointment or late cancellation shall be chargeable. Please refer to Terms & Conditions for more details.</li>
                            </BookingInfo>
                        </InfoBox>
                    </>
                }
            </ChatControl>
        </Page>
    )
}
