import { createSlice } from "@reduxjs/toolkit";
import { tasksAdapter } from "./tasksAdapter";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    addTask: tasksAdapter.addOne,
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
