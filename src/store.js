import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: [],
  reducers: {
    addToSaved: (state, action) => {
      state.push(action.payload);
    },
    removeFromSaved: (state, action) => {
      return state.filter((item) => item.url !== action.payload.url);
    },
  },
});

export const { addToSaved, removeFromSaved } = savedSlice.actions;

const store = configureStore({
  reducer: {
    saved: savedSlice.reducer,
  },
});

export default store;
