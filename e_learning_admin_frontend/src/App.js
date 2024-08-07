import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ClassDetails from "./pages/classDetails";
import LoginPage from "./pages/login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classes/:id" element={<ClassDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
