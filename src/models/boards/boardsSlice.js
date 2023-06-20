import { createSlice } from "@reduxjs/toolkit";
import { addTask, removeTask } from "../tasks/tasksSlice";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: {},
    boardsIds: [],
  },
  reducers: {
    addBoard(state, { payload }) {
      const { id, ...values } = payload;
      state.boards[id] = { id, ...values };
      state.boardsIds = [id, ...state.boardsIds];
    },
    editBoard(state, { payload }) {
      const { id, ...values } = payload;
      state.boards[id] = {
        ...state.boards[id],
        ...values,
      };
    },
    removeBoard(state, { payload }) {
      state.activeBoardId = null;
      delete state.boards[payload.id];
      state.boardsIds = state.boardsIds.filter((id) => id !== payload.id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTask, (state, { payload }) => {
        state.boards[payload.boardId].tasksIds = [
          payload.id,
          ...state.boards[payload.boardId].tasksIds,
        ];
      })
      .addCase(removeTask, (state, { payload }) => {
        state.boards[payload.boardId].tasksIds = state.boards[
          payload.boardId
        ].tasksIds.filter((id) => id !== payload.id);
      });
  },
});

export const { addBoard, editBoard, removeBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
