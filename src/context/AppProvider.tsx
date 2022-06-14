<<<<<<< HEAD
import { createContext, ReactNode, useEffect, useState } from "react";
=======
import { createContext, ReactNode, useState } from "react";
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4
import { Database, Theme } from "../http/Database";
import { IDatabase } from "../interfaces/data";
import { ITheme, Language } from "../interfaces/ui";
import Generator from "../utils/Generator";
import { createGlobalStyle } from "styled-components";
<<<<<<< HEAD
import { IProvider } from "../interfaces/provider";
=======
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4

export const GlobalStyles = createGlobalStyle<{ theme: ITheme }>`

    :root {
        font-size: 62.5%;
        background-color: #ffffff;
        font-family: ${props => props.theme.font_family};
    }

    :root, #root, body {
        height: 100%
    }

    * {
        padding: 0; margin: 0;
        box-sizing: border-box;
    }

    body {
        font-size: 1em;
    }

    div, span {
        font-size: 1em;
    }

    p, li, button, input, option, select, label {
        font-family: ${props => props.theme.font_family};
        font-size: 1.4em;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 10px;
    }

    h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 1.6em;
        margin-bottom: 10px;
    }

    h4 {
        font-size: 1.4em;
        margin-bottom: 10px;
    }
`

interface IAppContext {
    theme: ITheme;
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>,
    data: IDatabase;
    setData: React.Dispatch<React.SetStateAction<IDatabase>>;
}

export const AppContext = createContext<IAppContext>({ theme: null!, language: Language.en, setLanguage: null!, data: null!, setData: null! });

export const AppProvider = ({ children }: { children?: ReactNode }) => {

    // TODO: remove Database after integrated with API backend
    let newData = Generator.populateRandomData(Database);
    const [data, setData] = useState<IDatabase>(newData);

    const [theme] = useState<ITheme>(Theme);
    const [language, setLanguage] = useState<Language>(Language.en);

<<<<<<< HEAD
    const [providers, setProvider] = useState<IProvider[]>();

    useEffect(() => {
        let lsProviders = localStorage.getItem('providers')
        lsProviders && setProvider(JSON.parse(lsProviders));
    },[])

=======
>>>>>>> 9492542e7a9e8c46025edec9b41d752a1c672ac4
    return (
        <AppContext.Provider value={{ theme, language, setLanguage, data, setData }}>
            <GlobalStyles theme={theme} />
            {children}
        </AppContext.Provider>
    )
}
