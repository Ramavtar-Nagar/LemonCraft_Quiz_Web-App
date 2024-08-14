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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          dispatch(answerQuestion({ answer: selectedAnswer, timeOut: true }));
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedAnswer, currentQuestionIndex, dispatch]);

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
    dispatch(answerQuestion({ answer: selectedAnswer, timeOut: false }));
    if (currentQuestionIndex === 9) {
      navigate("/results");
    }
  };

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <div>
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerChange(option)}
            style={{
              backgroundColor:
                currentQuestion.type === "single" && selectedAnswer === option
                  ? "blue"
                  : currentQuestion.type === "multiple" &&
                    selectedAnswer.includes(option)
                  ? "blue"
                  : "grey",
              color: "white",
              margin: "5px",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Answer</button>
      <div>Time Left: {timeLeft} seconds</div>
    </div>
  );
};

export default Question;
