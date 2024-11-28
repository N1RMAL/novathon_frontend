import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import CaseFilesSearch from "./CaseFilesSearch"; // Add your case search page component
import LegalChatPage from "./chat";
import LegalAdvisoryDashboard from "./dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/case-search" element={<CaseFilesSearch />} />
      <Route path="/chat" element={<LegalChatPage />} />
      <Route path="/dashboard" element={<LegalAdvisoryDashboard />} />
    </Routes>
  </Router>
);

export default App;
