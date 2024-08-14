import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { score } = useSelector((state) => state.quiz);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-300 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Your Final Score: <span className="text-teal-500">{score}</span>
        </h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 py-3 px-6 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-green-600 transition-colors duration-300"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;
