import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import User from "./components/User";
import ErrorBoundary from "./components/ErrorBoundary";

export const UserTokenContext = createContext();

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'))
  return (
    <>
    <Router>
    <ErrorBoundary>
      <UserTokenContext.Provider value={{token: authToken, setToken: setAuthToken }}>
        <Header/>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/sign-in" element={<Login/>}/>
            <Route exact path="/sign-up" element={<SignUp/>}/>
            <Route exact path="/users" element={<User/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </UserTokenContext.Provider>
    </ErrorBoundary>
  </Router>
    </>
  );
}

