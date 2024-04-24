// import { useState } from 'react';
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Nav from "./Components/nav/Nav";
import Foooter from "./Components/footer/Foooter";
import { UserNameContext } from "./Components/UserNameParent";

function App() {
  return (
    <>
     <Nav name={UserNameContext}/>
     <Outlet name={UserNameContext}/>
     <Foooter />
    </>
  );
}

export default App;
