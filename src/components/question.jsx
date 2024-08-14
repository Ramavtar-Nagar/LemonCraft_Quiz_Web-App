import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.quiz
  );
  const currentQuestion = questions[currentQuestionIndex];

  const [selectedAnswer, setSelectedAnswer] = useState(
    currentQuestion.type === "single" ? "" : []
  );
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // Effect to handle timer countdown
  useEffect(() => {
    if (isSubmitting) return; // Skip timer when submitting

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          dispatch(answerQuestion({ answer: selectedAnswer, timeOut: true }));
          setTimeLeft(30); // Reset timer to 30 seconds on timeout
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedAnswer, dispatch, isSubmitting]); // Include `isSubmitting` in dependency array

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
    setIsSubmitting(true); // Set submitting state to true
    dispatch(answerQuestion({ answer: selectedAnswer, timeOut: false }));
    setTimeLeft(30); // Reset timer on submit
    setIsSubmitting(false); // Reset submitting state

    if (currentQuestionIndex === 9) {
      navigate("/results");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {currentQuestion.question}
        </h2>
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerChange(option)}
              className={`py-3 px-6 rounded-lg font-semibold transition-colors transform
                ${currentQuestion.type === "single" && selectedAnswer === option
                  ? "bg-blue-600"
                  : currentQuestion.type === "multiple" && selectedAnswer.includes(option)
                  ? "bg-blue-600"
                  : "bg-gray-300"}
                hover:bg-blue-700 hover:text-white text-gray-800
                focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors duration-300
            hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Submit Answer
        </button>
        <div className="mt-4 text-center text-lg text-gray-700">
          Time Left: <span className="font-bold">{timeLeft} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Question;
