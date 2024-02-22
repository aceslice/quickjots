import logo from "/assets/logo.svg";
import summer from "/assets/settings.svg";
const Topnav = () => {
  return (
    <nav className="topnav">
      <div className="logo-container">
        <img src={logo} alt={logo} />
      </div>
      <img src={summer} alt="" className="ico" />
    </nav>
  );
};
export default Topnav;
