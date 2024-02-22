import newIcon from "/assets/create.svg";
const Header = () => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  return (
    <div className="header">
      <h3>{getGreeting()}</h3>
      <button>
        <img src={newIcon} alt="" className="ico" />
        New note
      </button>
    </div>
  );
};
export default Header;
