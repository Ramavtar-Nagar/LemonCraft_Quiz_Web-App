import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { score } = useSelector((state) => state.quiz);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your Final Score: {score}</h1>
      <button onClick={() => navigate("/")}>Restart Quiz</button>
    </div>
  );
};

export default Results;
