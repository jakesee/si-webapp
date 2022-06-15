import React, { createContext, ReactNode, useEffect, useState } from "react";
import http from "../http";
import { IUser, User } from "../interfaces/user";

interface IAuthContext {
    session?: User,
    accessToken?: string,
    signIn: (user: User, done?: VoidFunction) => void;
    signOut: (done: VoidFunction) => void
}

export const AuthContext = createContext<IAuthContext>(undefined!);

export const AuthProvider = ({ children }: { children?:ReactNode }) => {

    let [accessToken, setAccessToken] = useState<string>();
    let [session, setSession] = useState<User>();

    useEffect(() => {

        let newAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkucWEubXktZG9jLmNvbSIsImlhdCI6MTY1NTI2Njg4MSwiZXhwIjoxNjU3ODU4ODgxLCJqdGkiOiJiNmM0M2U3YS02MGM0LTQyOWMtOTlmYi00YzlkYWI3YTc2YTgiLCJuYmYiOjE2NTUyNjY4ODEsInN1YiI6IjY0MzI5IiwidXNyIjp7ImltdSI6Imljb24ucG5nIiwiZm5tIjoiQXBwbGUiLCJsbm0iOiJUYW4iLCJlbWwiOiJqYWtlc2VlKzIwMjEwNjA1QGdtYWlsLmNvbSIsInJvbCI6W3siaWQiOiIyIiwibmFtZSI6InBhdGllbnQifV0sIm1mYSI6ImZhbHNlIn19.P31kN8b_cur_z0cXGQUV_1F7me_tdWwr8lrx0N6qDRk';
        setAccessToken(newAccessToken);

        (async () => {
            let newUser = await http.signIn<IUser>(undefined!, undefined!);
            setSession(new User(newUser!));
        })();
    }, [])

    const signIn = (user: User, done?: VoidFunction) => {

        done && done();
    }

    const signOut = (done: VoidFunction) => {
        console.log('signed out');

        done && done();
    }

    return <AuthContext.Provider value={{ accessToken, session, signOut, signIn}}>{children}</AuthContext.Provider>
}


