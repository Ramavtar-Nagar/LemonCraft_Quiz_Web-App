import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TagSelection from "./components/SelectingTags";
import Question from "./components/question";
import Results from "./components/result";
import "./index.css";
import quiz from "./components/question"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TagSelection />} />
        <Route path="/quiz" element={<Question />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
