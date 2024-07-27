import React, { useState } from "react";
import './Navbar.css'

const Navbar = () => {

  const [isSelected, setIsSelected] = useState("");

  return (
    <div className="nav_container">
      <div className="nav_contents">
        <div className="logo">
          <p>NoteIt</p>
        </div>
        <div className="options">
          <ul>
            <li onClick={() => setIsSelected("home")} className = {isSelected === "home" ? "active" : " "}>Home</li>
            <li onClick={() => setIsSelected("community")} className = {isSelected === "community" ? "active" : " "}>Community</li>
            <li onClick={() => setIsSelected("room")} className = {isSelected === "room" ? "active" : " "}>Room</li>
          </ul>
        </div>
        <div className="side_menu">
          <div className="icons">
            <i className="fa-solid fa-moon"></i>
          </div>
          <div className="icons">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
