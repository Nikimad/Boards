import { createSlice } from "@reduxjs/toolkit";
import { tasksAdapter } from "./tasksAdapter";
import getInitialState from "../../helpers/getInitialState";
import { getTasks, postTask, deleteTask, patchTask } from "./tasksThunks";
import handleThunks from "../../helpers/handleThunks";
import { deleteBoard } from "../boards/boardsThunks";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: getInitialState(tasksAdapter),
  extraReducers: (builder) =>
    handleThunks(builder, tasksAdapter, {
      getEntities: getTasks,
      postEntity: postTask,
      deleteEntity: deleteTask,
      patchEntity: patchTask,
    }).addCase(deleteBoard.fulfilled, (state, action) => {
      const { payload: id } = action;
      const { entities, ids } = state;
      const tasksIds = ids.filter((taskId) => entities[taskId].boardId === id);
      tasksAdapter.removeMany(state, tasksIds);
      state.visibleIds = [];
    }),
});

export default tasksSlice.reducer;
