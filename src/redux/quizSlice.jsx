import { createSlice } from "@reduxjs/toolkit";
import ques from "../data/que.json";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz(state, action) {
      const selectedTags = action.payload;
      const matchedQuestions = ques.questions
        .map((question) => ({
          ...question,
          matchCount: question.tags.filter((tag) => selectedTags.includes(tag))
            .length,
        }))
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 10);

      state.questions = matchedQuestions;
      state.currentQuestionIndex = 0;
      state.userAnswers = [];
      state.score = 0;
    },
    answerQuestion(state, action) {
      const { answer, timeOut } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];

      if (!timeOut) {
        if (currentQuestion.type === "single") {
          if (currentQuestion.correct.includes(answer)) {
            state.score += 4;
          } else {
            state.score -= 2;
          }
        } else if (currentQuestion.type === "multiple") {
          const correctAnswers = currentQuestion.correct;
          let correctCount = 0;
          let incorrectCount = 0;

          answer.forEach((ans) => {
            if (correctAnswers.includes(ans)) correctCount++;
            else incorrectCount++;
          });

          if (correctCount === correctAnswers.length && incorrectCount === 0) {
            state.score += 4;
          } else {
            state.score += correctCount - incorrectCount;
          }
        }
      }

      state.currentQuestionIndex++;
    },
    endQuiz(state) {},
  },
});

export const { startQuiz, answerQuestion, endQuiz } = quizSlice.actions;
export default quizSlice.reducer;
