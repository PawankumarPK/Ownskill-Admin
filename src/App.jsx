import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidePanel from "./components/sidePanel.component";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidePanel />} />
      </Routes>
    </Router>
  );
};

export default App;
