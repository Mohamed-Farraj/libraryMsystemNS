import {React,  useState  } from "react";
import Hero from "./hero/Hero";
import Gallery from "./gallery/Gallery";
import Nav from "./nav/Nav";
import Foooter from "./footer/Foooter";
import "../styles/desctop.css";
import { useParams } from "react-router-dom";
const Desctop = () => {
  let uname = useParams();
  return (
    <div className="desc">
      <Hero />
      <Gallery />
    </div>
  );
};

export default Desctop;
