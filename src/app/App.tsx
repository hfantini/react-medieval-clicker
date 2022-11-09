import './App.scss'
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Splash from "./view/templates/splash/Splash"
import Login from "./view/templates/login/Login"
import Game from './view/templates/game/Game'
import About from "./view/templates/about/About"
import NewAccount from './view/templates/new-account/NewAccount';

function App() {

  useEffect(() => {
    (window as any).account = {};
    (window as any).account.clear = () => 
    {
      window.localStorage.clear();
      return "Accounts successfully cleared"
    }
  }, [])
  

  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/splash"/> } />
      <Route path="splash" element={ <Splash/> } />
      <Route path="about" element={ <About/> } />
      <Route path="login" element={ <Login/> } />
      <Route path="new-account" element={ <NewAccount/> } />
      <Route path="game" element={ <Game/> } />
    </Routes>
  );
}

export default App;
