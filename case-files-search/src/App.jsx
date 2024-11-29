import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import CaseFilesSearch from "./CaseFilesSearch"; // Add your case search page component
import LegalChatPage from "./chat";
import LegalAdvisoryDashboard from "./dashboard";
import HomePage from "./Homepage";
import RegistrationPage from "./registeration";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/case-search" element={<CaseFilesSearch />} />
      <Route path="/chat" element={<LegalChatPage />} />
      <Route path="/dashboard" element={<LegalAdvisoryDashboard />} />
      <Route path="/register" element={<RegistrationPage />} />

    </Routes>
  </Router>
);

export default App;
