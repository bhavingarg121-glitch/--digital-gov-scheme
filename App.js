import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScholarshipPage from "./ScholarshipPage";
import PensionPage from "./PensionPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scholarship" element={<ScholarshipPage />} />
        <Route path="/pension" element={<PensionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
