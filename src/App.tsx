import React, { useState } from 'react';
import { Home } from './component/page/mydoc/Home';
import { FormClinic } from './component/form/mydoc/FormClinic';
import { Start } from './component/page/mydoc/Start';
import { GlobalStyles } from './GlobalStyles';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AppContext } from './context/AppContext';
import Generator from './utils/Generator';
import { IUser, UserRole } from './interfaces/user';
import { IDatabase } from './interfaces/data';
import { Database, Theme } from './context/Database';
import { ITheme } from './interfaces/ui';
import { Appointments } from './component/page/mydoc/Appointments';
import { WaitingRoom } from './component/page/mydoc/WaitingRoom';

function App() {

  let newData = Generator.populateRandomData(Database);
  let newSession = Generator.any(newData.users.filter(u => u.role == UserRole.patient), 1)[0]

  const [data, setData] = useState<IDatabase>(newData);
  const [session, setSession] = useState<IUser | null>(newSession);
  const [theme] = useState<ITheme>(Theme);

  return (
    <AppContext.Provider value={{ data, theme, setData, session, setSession }}>
      <GlobalStyles theme={theme} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/start" element={<Start />} />
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
