import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CollapsiblePanel } from "../../component/CollapsiblePanel";
import { DataContext } from "../../context/DataContext";
import { Screen } from "./Screen";
import { format } from "date-fns"

const Wrapper = styled.div`

`

export const Appointments = () => {

    let navigate = useNavigate();

    let { data, session } = useContext(DataContext);

    console.log(session);

    let episodes = data.episodes.filter(e => e.participants.findIndex(p => p.id === session?.id) > 0);
    let episodeIds = episodes.map(e => e.id);
    let appointments = data.appointments.filter(a => episodeIds.includes(a.episodeId));

    return (
        <Screen backLabel="Dashboard" onBack={(e) => navigate('/') }>
            {appointments.map((a, i) => (
                <CollapsiblePanel key={i} isCollapsed={true} label={<p>{`${format(a.startAt, "dd MMM yyyy, HH:mm")} - ${format(a.endAt, "HH:mm")}`}</p>}>
                <div>{a.episodeId}</div>
                <div>{a.status}</div>
                <div>{a.episodeId}</div>
                </CollapsiblePanel>
            ))}
        </Screen>
    )
}
