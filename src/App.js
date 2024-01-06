import './App.css';
import { Routes, Route, Navigate,} from "react-router-dom";
import PageHomeDN from './PageHomeDN';
import PageHDNPatient from './PageHDNPatient';
import PageHomeLC from './PageHomeLC';
import PageHomeMT from './PageHomeMT';
import PageHomePG from './PageHomePG';
import PageAdmin from './PageAdmin';
import PageLogin from './PageLogin';
import PageHDNPIDetailed from "./PageHDNPIDetailed";
import Userfront from "@userfront/react";
import React from 'react';

Userfront.init("8nwyy85n");

function Home() {
  if (!Userfront.accessToken()) {
    return <PageLogin />;
  } else if (Userfront.user.hasRole("viewer")) {
    return <PageHomeDN />;
  } else if (Userfront.user.hasRole("author")) {
    return <PageHomeLC />;
  } else if (Userfront.user.hasRole("support")) {
    return <PageHomeMT />;
  } else if (Userfront.user.hasRole("subscriber")) {
    return <PageHomePG />;
  } else if (Userfront.user.hasRole("admin")) {
    return <PageAdmin />;
  }
  return <PageLogin />;
}



function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          Userfront.accessToken() ? (
            <Home />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/patient/:patientId" element={<PageHDNPatient/>}/>
      <Route path="/patient/:patientId/:testCode/:testId" element={<PageHDNPIDetailed/>}/>
    </Routes>
  );
}

export default App;