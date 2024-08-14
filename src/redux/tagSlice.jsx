import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTags: [],
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    selectTag: (state, action) => {
      const tag = action.payload;

      if (!state.selectedTags.includes(tag) && state.selectedTags.length < 20) {
        state.selectedTags.push(tag);
      }
    },

    removeTag: (state, action) => {
      const tag = action.payload;
      state.selectedTags = state.selectedTags.filter((t) => t !== tag);
    },

    resetTags: (state) => {
      state.selectedTags = [];
    },
  },
});

export const { selectTag, removeTag, resetTags } = tagSlice.actions;

export default tagSlice.reducer;
