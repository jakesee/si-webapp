import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppointments } from "../../../hooks/useAppointments";
import { FormTitle, FormButton, PageTitle, FormButtonNav, WideButton } from "../../common";
import { InfoBox } from "../../control/InfoBox";
import { Page } from "../../control/Page";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SendIcon from '@mui/icons-material/Send';
import { format } from "date-fns";

const Wrapper = styled.div`
    height: 100%;
    overflow: hidden;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: min-content 1fr min-content;

`

const Content = styled.div`
    background-color: #F8F9F9;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 20px;

    .msg-row {
        display: flex;

        &.left {
            flex-direction: row;
        }

        &.right {
            flex-direction: row-reverse;
        }

        .msg-bubble {
            background-color: pink;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            width: 60%;

            .meta {
                text-align: right;
                font-size: 1em;
            }
        }
    }
`

const ControlBar = styled.div`
    padding: 10px 10px 20px 10px;

    display: flex;
    gap: 5px;
    align-items: center;

    .icon {
        font-size: 2.1em;
        color: rgba(0, 0, 0, 0.54)
    }
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

    const { getUpcomingAppointment } = useAppointments();

    const appointment = getUpcomingAppointment();

    return (
        <Page onBack={() => navigate('/')} backLabel="Dashboard" isScrollable={false}>
            <Wrapper>
                <PageTitle>Consultation Room</PageTitle>
                <Content>
                    {!appointment ? <p>There is no upcoming appointment.</p> :
                        <>
                        <h3>Appointment Details</h3>
                        <AppointmentDetails>
                            <table>
                                <tbody>
                                    <tr><td>Status</td><td>{appointment.status}</td></tr>
                                    <tr><td>Episode Id</td><td>{appointment.episodeId}</td></tr>
                                    <tr><td>Specialisation</td><td>{appointment.groupName}</td></tr>
                                    <tr><td>Doctor</td><td>{`${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`}</td></tr>
                                    <tr><td>Clinic</td><td>{appointment.doctor?.clinic}</td></tr>
                                    <tr><td>Date/Time</td><td>{`${format(appointment.startAt, "dd MMM yyyy, HH:mm")} - ${format(appointment.endAt, "HH:mm")}`}</td></tr>
                                </tbody>
                            </table>
                        </AppointmentDetails>
                        <InfoBox type="Info" title={<h4 style={{ margin: 0 }}>Before your appointment:</h4>}>
                            <BookingInfo>
                                <li>Arrive at least 2 minutes before your consultation time.</li>
                                <li>You will be able to start the video call when the doctor is ready.</li>
                                <li>Have your identification documents ready for verification by the attending doctor.</li>
                                <li>Missed appointment or late cancellation shall be chargeable. Please refer to Terms & Conditions for more details.</li>
                            </BookingInfo>
                        </InfoBox>
                        <div><WideButton disabled>Start Video</WideButton></div>
                        <div><WideButton>Concierge Chat</WideButton></div>
                        </>
                    }
                    <div className="msg-row left">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row right">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row left">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row right">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row left">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row right">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row left">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row right">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row left">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row right">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row left">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                    <div className="msg-row right">
                        <img src="" />
                        <div className="msg-bubble">
                            <div className="msg"><p>This is a good life</p></div>
                            <div className="meta">2022-01-01 5:34pm</div>
                        </div>
                    </div>
                </Content>
                <ControlBar>
                    <ChatInput>
                        <input />
                        <AttachFileIcon className="icon"/>
                        <VideoCameraFrontIcon className="icon"/>
                        <LiveHelpIcon className="icon"/>
                    </ChatInput>
                    <SendIcon className="icon"/>
                </ControlBar>
            </Wrapper>
        </Page>
    )
}
