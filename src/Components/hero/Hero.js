import styles from "./hero.module.css";
import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

function Hero() {

  return (
    <>
    <div className={`${styles.hero}`}>
      <div className={`${styles.container}`}>
      <h1 className={`${styles.philosopherbold}`}>There Is No Friend As Loyal As A Book</h1>
      <p>Embrace the Unwavering Loyalty Found Within the Pages of a Good Book: Your Everlasting Companion in Every Journey, Adventure, and Reflection.</p>
      </div>

    </div>
    </>
  );
}
export default Hero;
