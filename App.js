import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScholarshipPage from "./ScholarshipPage";
import PensionPage from "./PensionPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Router>
      {/* Navigation bar */}
      <nav className="bg-gray-800 p-4 text-white flex gap-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/scholarship" className="hover:underline">Scholarship</Link>
        <Link to="/pension" className="hover:underline">Pension</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </nav>

      {/* Routes */}
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
