import { createContext, useState } from "react";
import { Database, Theme } from "./Database";
import { IDatabase } from "../interfaces/data";
import { IUser } from "../interfaces/user";
import { ITheme } from "../interfaces/ui";


export interface IDataContext {
    data: IDatabase;
    theme: ITheme;
    session: IUser | null;
    setSession: React.Dispatch<React.SetStateAction<IUser | null>>;
    setData: React.Dispatch<React.SetStateAction<IDatabase>>;
}

export const DataContext = createContext<IDataContext>({ data: Database, theme: Theme, session: null, setSession: () => { }, setData: () => { } });


