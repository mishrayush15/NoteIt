
import React, { useState } from "react";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import MainPart from './Components/UploadFile/MainPart/MainPart';
import Footer from './Components/Footer/Footer'
import './index.css';

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`main_app_container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <LandingPage />
      <MainPart />
      <Footer/>
    </div>
  );
};

export default App;

