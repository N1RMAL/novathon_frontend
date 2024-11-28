import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import CaseFilesSearch from "./CaseFilesSearch"; // Add your case search page component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/case-search" element={<CaseFilesSearch />} />
    </Routes>
  </Router>
);

export default App;
