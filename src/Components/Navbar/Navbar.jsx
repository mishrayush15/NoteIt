import React, { useState } from "react";
import './Navbar.css'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useRef } from 'react';

const Navbar = ( {theme , setTheme}) => {

  const[isSelected, setIsSelected] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light" ))
  }
  
  const tl = gsap.timeline();

  useGSAP( () => {
    tl.from(".logo", {
      opacity: 0,
      delay: 0.5,
      duration:0.5,
      y: 30
    })

    tl.from("li", {
      y: -30,
      delay: 0.5,
      duration: 0.7,
      stagger: 0.2,
      opacity: 0
    })

    tl.from(".side_menu", {
      opacity: 0,
      delay: 0,
      duration:0.5,
      y: 30
    })
  })


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
          <div className="icons" onClick={toggleTheme}>
            <i className={`fa-solid ${ theme === "light" ? "fa-moon" : "fa-sun"}` } ></i>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
