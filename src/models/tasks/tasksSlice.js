import { createSlice } from "@reduxjs/toolkit";
import { removeBoard } from "../boards/boardsSlice";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
  },
  reducers: {
    addTask(state, {payload}) {
      state.items = [ payload, ...state.items]
    },
    removeTask(state, { payload }) {
      state.items = state.items.filter((board) => board.id !== payload);
    },
    updateTask(state, { payload }) {
      state.items = state.items.map((board) =>
        board.id === payload.id ? { ...board, ...payload.changes } : board
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(removeBoard, (state, { payload }) => {
      state.items = state.items.filter((task) => !payload.tasks.includes(task.id));
    });
  },
});

export const { addTask, removeTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
