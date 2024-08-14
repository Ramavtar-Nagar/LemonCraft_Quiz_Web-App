import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectTag, removeTag } from "../redux/tagSlice";
import { useNavigate } from "react-router-dom";
import ques from "../data/que.json";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center justify-center p-8">
      <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-8 shadow-lg rounded-2xl border border-gray-300">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
          Choose Up to 20 Tags
        </h1>
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {ques.uniqueTags.map((tag, index) => (
            <button
              key={`${tag}-${index}`}
              onClick={() => handleTagClick(tag)}
              className={`py-3 px-6 rounded-lg text-white font-semibold transition-transform transform
                ${selectedTags.includes(tag) ? 
                  "bg-gradient-to-r from-yellow-400 to-red-500 shadow-md" : 
                  "bg-gray-300 text-black shadow-sm"}
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300`}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={selectedTags.length === 0}
          className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-lg shadow-lg transition-colors duration-300 
            hover:from-green-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default TagSelection;
