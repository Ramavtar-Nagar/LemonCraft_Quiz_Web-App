import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTag, removeTag, resetTags } from "../redux/tagSlice";
import { useNavigate } from "react-router-dom";
import ques from "../data/que.json"
import { startQuiz } from "../redux/quizSlice";

const TagSelection = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      dispatch(removeTag(tag));
    } else if (selectedTags.length < 20) {
      setSelectedTags([...selectedTags, tag]);
      dispatch(selectTag(tag));
    }
  };

  const handleSubmit = () => {
    dispatch(startQuiz(selectedTags));
    navigate("/quiz"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-4xl w-full border border-gray-200">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Select Up to 20 Tags
        </h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {ques.uniqueTags.map((tag, index) => (
          <button
            key={`${tag}-${index}`} // Combine tag and index for a unique key
            onClick={() => handleTagClick(tag)}
            className={`py-3 px-6 rounded-full text-white font-semibold transition-transform transform 
              ${
                selectedTags.includes(tag)
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 text-black"
              }
              hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300`}
          >
            {tag}
          </button>
        ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={selectedTags.length === 0}
          className="w-[50%]  mx-[25%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold transition-colors duration-300 
            hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default TagSelection;

