import { createSlice } from "@reduxjs/toolkit";
import { addTask } from "../tasks/tasksSlice";
import { removeBoard } from "../boards/boardsSlice";

const initialState = {
  boardId: null,
  boardsTasks: {},
};

const observerSlice = createSlice({
  name: "obsrver",
  initialState,
  reducers: {
    setBoard(state, { payload }) {
      state.boardId = payload;
    },
    setTask(state, { payload }) {
      state.taskId = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addTask, ({ boardsTasks, boardId }, { payload }) => {
      boardsTasks[boardId] = boardsTasks[boardId] ?? [];
      boardsTasks[boardId] = [payload.id, ...boardsTasks[boardId]];
    })
    .addCase(removeBoard, (state) => {
      delete state.boardsTasks[state.boardId];
      state.boardId = null;
    });
  },
});

export const { setBoard, setTask } = observerSlice.actions;

export default observerSlice.reducer;
