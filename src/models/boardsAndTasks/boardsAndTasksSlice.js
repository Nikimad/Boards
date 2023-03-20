import { createSlice } from "@reduxjs/toolkit";
import { addBoard } from "../boards/boardsSlice";
import { addTask } from "../tasks/tasksSlice";

const initialState = {};

const boardsAndTasksSlice = createSlice({
  name: "boardsAndTasks",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addBoard, (state, { payload }) => {
        state[payload.id] = [];
      })
      .addCase(addTask, (state, { payload }) => {
        state[payload.boardId].shift(payload.id);
      });
  },
});

export default boardsAndTasksSlice.reducer;
