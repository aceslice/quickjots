import newIcon from "/assets/create.svg";
const Header = () => {
  const user = {
    name: "Gideon",
  };
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning ";
    } else if (currentHour < 18) {
      return "Good afternoon ";
    } else {
      return "Good evening ";
    }
  };
  return (
    <div className="header">
      <p>
        {getGreeting()} <br />
        <span>{user.name || "User"}</span>
      </p>
      <button>
        <img src={newIcon} alt="" className="ico" />
        New note
      </button>
    </div>
  );
};
export default Header;
