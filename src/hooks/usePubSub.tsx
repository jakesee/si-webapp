import React, { useRef, useState } from "react";


export interface ISubscriber {
    event: string,
    handler: (e: any) => void
}

export const usePubSub = () => {

    let subscribers = useRef<ISubscriber[]>([]);


    let [state, setState] = useState(0);

    const publish = (event: string, e: any) => {
        subscribers.current.forEach(sub => {
            if (sub.event === event)
                sub.handler(e);
        })
    }

    const subscribe = (event: string, handler: (eventArgs: any) => void) => {
        subscribers.current.push({ event: event, handler: handler });
    }

    return { publish, subscribe, state, setState };
}
