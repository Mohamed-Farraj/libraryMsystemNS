import React from 'react';

const Mealify = () => {
    return (
        <>
            <header>
      <div className="container">
        <div className="logo">
          <a href="#home"><h1>Mealify<span style={{ color: 'red' }}>.</span></h1></a>
        </div>
        <nav>
          <ul>
            <li className="liHome"><a href="#home">Home</a></li>
            <li><a href="#chefs">Chefs</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="mode">
          <i className="fa-solid fa-moon"></i>
          <i className="fa-solid fa-bars menu"></i>
        </div>
      </div>
    </header>
        </>
    );
}

export default Mealify;
