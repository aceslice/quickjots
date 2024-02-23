import Tab from "./components/Tab";
import Topnav from "./components/Topnav";
import Header from "./components/Header";
import Card from "./components/Card";
import { useContext } from "react";
import { ThemeContext } from "./Theme";
import "./style.css";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Topnav />
      <Header />
      <Tab />
      <Card />
    </div>
  );
}
export default App;
