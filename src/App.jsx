import React, { useState } from "react";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import MainPart from './Components/UploadFile/MainPart/MainPart';
import Footer from './Components/Footer/Footer'


import './index.css';
import gsap from 'gsap';

const App = () => {
  const [theme, setTheme] = useState("light");

  const cursorHandler = (e) => {
    gsap.to(".cursor", {
      x: e.clientX,
      y: e.clientY,
      duration: 0.7,
      ease: 'power3.out'
    });
  };

  return (
    <div className={`main_app_container ${theme}`} onMouseMove={cursorHandler}>
      <div className="cursor"></div>
      <Navbar theme={theme} setTheme={setTheme} />
      <LandingPage />
      <MainPart />
      <Footer />
    </div>
  );
};

export default App;
