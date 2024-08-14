import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./tagSlice";
import quizReducer from "./quizSlice";

const store = configureStore({
  reducer: {
    tags: tagReducer,
    quiz: quizReducer,
  },
});

export default store;
