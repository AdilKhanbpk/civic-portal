import React, { useState , useEffect , useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [togglenavbar, settogglenavbar] = useState(false);
  const navbarRef = useRef(false)

  const shownavbar = () => {   
    settogglenavbar(prevState => !prevState);
  }; 


  //handling outside Click To Close Navbar In Small Screens
  const handleOutsideClick = (event) => {
    if(navbarRef.current && navbarRef.current.contains(event.target)){
    settogglenavbar(false);
    }
  }

useEffect ( () => {
   if(togglenavbar){
      document.addEventListener('click' , handleOutsideClick)
   }else{
     document.removeEventListener('click' , handleOutsideClick)
   }

   return() => {
   document.removeEventListener('click' , handleOutsideClick)
   };
} , [togglenavbar])


  return (
    <div className="navone">
      <div className="navbar" onClick={shownavbar}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3V7H3V3H12ZM16 17V21H3V17H16ZM22 10V14H3V10H22Z"></path>
        </svg>
      </div>
      
      <div className={`nav ${togglenavbar ? 'show' : ''}`} ref={navbarRef}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-button actived' : 'nav-button')}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-button actived' : 'nav-button')}
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? 'nav-button actived' : 'nav-button')}
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'nav-button actived' : 'nav-button')}
        >
          Contact
        </NavLink>
        
      </div>

      <div className="line2"><hr /></div>
    </div>
  );
};

export default Navbar;
