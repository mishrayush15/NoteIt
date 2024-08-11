import Navbar from '../Navbar'
import React, { useState } from "react";


const NavbarMain = () => {

  const [theme, setTheme] = useState("light");

  return (
    
    <div className='navbar_main'>
      <Navbar theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default NavbarMain