import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);
  const currentQuestion = questions[currentQuestionIndex];

  const [selectedAnswer, setSelectedAnswer] = useState(
    currentQuestion.type === "single" ? "" : []
  );
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          dispatch(answerQuestion({ answer: selectedAnswer, timeOut: true }));
          setTimeLeft(30);
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedAnswer, dispatch, isSubmitting]);

  const handleAnswerChange = (option) => {
    if (currentQuestion.type === "single") {
      setSelectedAnswer(option);
    } else {
      setSelectedAnswer((prev) => {
        if (prev.includes(option)) {
          return prev.filter((ans) => ans !== option);
        } else {
          return [...prev, option];
        }
      });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    dispatch(answerQuestion({ answer: selectedAnswer, timeOut: false }));
    setTimeLeft(30);
    setIsSubmitting(false);

    if (currentQuestionIndex === 9) {
      navigate("/results");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerChange(option)}
              className={`py-3 px-4 rounded-lg text-white font-semibold transition-transform transform
                ${currentQuestion.type === "single" && selectedAnswer === option
                  ? "bg-blue-500 scale-105"
                  : currentQuestion.type === "multiple" && selectedAnswer.includes(option)
                  ? "bg-blue-500 scale-105"
                  : "bg-gray-400 hover:bg-gray-500"} 
                focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-green-600 transition-colors duration-300"
        >
          Submit Answer
        </button>
        <div className="mt-4 text-lg font-semibold text-gray-700">
          Time Left: {timeLeft} seconds
        </div>
      </div>
    </div>
  );
};

export default Question;
