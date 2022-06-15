import React, { createContext, ReactNode, useContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { SocketService } from "../http/SocketService";
import { AuthContext } from "./AuthProvider";

interface ISocketContext {
    socket?: SocketService;
}

export const SocketContext = createContext<ISocketContext>(undefined!);

export const SocketProvider = ({ children }: { children?: ReactNode }) => {

    let { accessToken } = useContext(AuthContext);
    let { socket } = useSocket(accessToken);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}


