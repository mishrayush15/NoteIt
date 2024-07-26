import React from "react";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav_container">
      <div className="nav_contents">
        <div className="logo">
          <p>NoteIt</p>
        </div>
        <div className="options">
          <ul>
            <li>Home</li>
            <li>Community</li>
            <li>Room</li>
          </ul>
        </div>
        <div className="side_menu">
          <div className="icons">
            <i class="fa-solid fa-moon"></i>
          </div>
          <div className="icons">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
