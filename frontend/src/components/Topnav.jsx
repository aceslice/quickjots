import logo from "/assets/logo.svg";
import summer from "/assets/moon_and_stars.svg";
import React, { useContext } from "react";
import { ThemeContext } from "../Theme";
const Topnav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="topnav">
      <div className="logo-container">
        <img src={logo} alt={logo} />
      </div>
      <img src={summer} alt="" onClick={toggleTheme} className="ico" />
    </nav>
  );
};
export default Topnav;
