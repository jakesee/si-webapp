import React, { useState } from 'react';
import { Home } from './page/mydoc/Home';
import { Clinics } from './page/mydoc/Clinics';
import { Start } from './page/mydoc/Start';
import { GlobalStyles } from './GlobalStyles';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { DataContext } from './context/DataContext';
import Generator from './utils/Generator';
import { IUser, UserRole } from './interfaces/user';
import { IDatabase } from './interfaces/data';
import { Database, Theme } from './context/Database';
import { ITheme } from './interfaces/ui';
import { Appointments } from './page/mydoc/Appointments';

function App() {

  let newData = Generator.populateRandomData(Database);
  let newSession = Generator.any(newData.users.filter(u => u.role == UserRole.patient), 1)[0]

  const [data, setData] = useState<IDatabase>(newData);
  const [session, setSession] = useState<IUser | null>(newSession);
  const [theme] = useState<ITheme>(Theme);

  return (
    <div className="App">
      <GlobalStyles />
      <DataContext.Provider value={{ data, theme, setData, session, setSession }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clinics" element={<Clinics />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/start/:groupId" element={<Start />} />
              <Route index element={<Home />} />
            </Routes>
          </BrowserRouter>
      </DataContext.Provider>

    </div>
  );
}

export default App;
