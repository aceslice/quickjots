import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./style.css";
import Home from "./pages/home";
import NotePage from "./pages/NotePage";
import Newnote from "./pages/Newnote";
import NotebookPage from "./pages/NotebookPage";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/:noteId" element={<NotePage />} />
          <Route path="/new" element={<Newnote />} />
          <Route path="/notebooks/:notebookId" element={<NotebookPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
