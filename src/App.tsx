import React from 'react';
import { Home } from './component/page/mydoc/Home';
import { Start } from './component/page/mydoc/Start';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AppProvider } from './context/AppProvider';
import { Appointments } from './component/page/mydoc/Appointments';
import { ConsultationRoom } from './component/page/mydoc/ConsultationRoom';
import { Concierge } from './component/page/mydoc/Concierge';
import { AuthProvider } from './context/AuthProvider';
import { SocketProvider } from './context/SocketProvider';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter basename="/myfriend">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/consultation-room/:appointmentId" element={<ConsultationRoom />} />
                <Route path="/concierge/:episodeId" element={<Concierge />} />
                <Route path="/start" element={<Start />} />
                <Route index element={<Home />} />
            </Routes>
            </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
