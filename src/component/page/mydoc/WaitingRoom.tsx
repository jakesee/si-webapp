import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageTitle, Section } from "../../common";
import { InfoBox } from "../../control/InfoBox";
import { MobileFrame } from "../../control/MobileFrame";

const BookingInfo = styled.ul`

    margin-left: 10px;

    li {
        margin-left: 10px;
    }
`

export const WaitingRoom = () => {

    const navigate = useNavigate()

    return (
        <MobileFrame onBack={(e) => navigate('/')}>
            <PageTitle>Waiting Room</PageTitle>
            <Section>
                <InfoBox title={<h4></h4>} type="Info">
                    <InfoBox type="Info" title={<h4 style={{ margin: 0 }}>Before your appointment:</h4>}>
                        <BookingInfo>
                            <li>Arrive at least 2 minutes before your consultation time.</li>
                            <li>You will be able to start the video call when the doctor is ready.</li>
                            <li>Have your identification documents ready for verification by the attending doctor.</li>
                            <li>Missed appointment or late cancellation shall be chargeable. Please refer to Terms & Conditions for more details.</li>
                        </BookingInfo>
                    </InfoBox>
                </InfoBox>
            </Section>
        </MobileFrame>
    )
}
