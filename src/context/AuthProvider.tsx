import React, { createContext, ReactNode, useState } from "react";
import http from "../http";
import { IUser } from "../interfaces/user";
import Generator from "../utils/Generator";

interface IAuthContext {
    session?: IUser,
    accessToken?: string,
    signIn: (user: IUser, done?: VoidFunction) => void;
    signOut: (done: VoidFunction) => void
}

export const AuthContext = createContext<IAuthContext>(undefined!);

export const AuthProvider = ({ children }: { children?:ReactNode }) => {

    let newUser = http.signIn(undefined!, undefined!);
    let newAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkucWEubXktZG9jLmNvbSIsImlhdCI6MTY1NTEyODQ1MiwiZXhwIjoxNjU3NzIwNDUyLCJqdGkiOiI4MGVjMTEyZi03NzU5LTRiZTgtOGMyOC0yZGU3M2FjYzI4MzAiLCJuYmYiOjE2NTUxMjg0NTIsInN1YiI6IjY0MzI5IiwidXNyIjp7ImltdSI6Imljb24ucG5nIiwiZm5tIjoiQXBwbGUiLCJsbm0iOiJUYW4iLCJlbWwiOiJqYWtlc2VlKzIwMjEwNjA1QGdtYWlsLmNvbSIsInJvbCI6W3siaWQiOiIyIiwibmFtZSI6InBhdGllbnQifV0sIm1mYSI6ImZhbHNlIn19.kvWtt09_C096Qx88-bU7j7E06TL1rZK8uSZLtjUU0SI';

    let [accessToken, setAccessToken] = useState<string>(newAccessToken);
    let [session, setSession] = useState<IUser>(newUser);

    const signIn = (user: IUser, done?: VoidFunction) => {

        done && done();
    }

    const signOut = (done: VoidFunction) => {
        console.log('signed out');

        done && done();
    }

    return <AuthContext.Provider value={{ accessToken, session, signOut, signIn}}>{children}</AuthContext.Provider>
}


