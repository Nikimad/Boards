import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardId: null,
  taskId: null,
};

const observerSlice = createSlice({
  name: "obsrver",
  initialState,
  reducers: {
    setBoard(state, {payload}) {
      state.boardId = payload;
    },
    setTask(state, {payload}) {
      state.taskId = payload;
    }
  },
});

export const { setBoard, setTask } = observerSlice.actions;

export default observerSlice.reducer;
