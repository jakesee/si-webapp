import { useEffect, useState } from "react";
import { SocketService } from "../http/SocketService";




export const useSocket = (accessToken?: string) => {

    let [socket, setSocket] = useState<SocketService>();

    useEffect(() => {

        if (!accessToken) return;

        let service = new SocketService(accessToken);

        setSocket(service);

    }, [accessToken])

    return { socket }
}
