import logo from "/assets/logo.svg";
import summer from "/assets/moon_and_stars.svg";
import { useContext } from "react";
import { ThemeContext } from "../Theme";
const Topnav = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="topnav">
      <div className="logo-container">
        <a href="/">
        <img src={logo} alt={logo} />
        </a>
      </div>
      <img src={summer} alt="" onClick={toggleTheme} className="ico" />
    </nav>
  );
};
export default Topnav;
