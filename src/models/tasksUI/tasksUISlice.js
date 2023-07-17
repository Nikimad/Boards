import { createSlice } from "@reduxjs/toolkit";
import { addTask, fetchTasks } from "../tasksDomain/tasksDomainThunks";
import { deleteBoard } from "../boardsDomain/boardsDomainThunks";
import isRequested from "../../helpers/isRequested";

const tasksUISlice = createSlice({
  name: "tasksUI",
  initialState: {
    ids: [],
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.ids = payload.map(({ id }) => id);
      })
      .addCase(addTask.fulfilled, (state, { payload: { task, searchParams } }) => {
        if (isRequested(task, searchParams)) {
          state.ids = [task.id, ...state.ids];
        }
      })
      .addCase(deleteBoard.fulfilled, (state, _) => {
        state.ids = [];
      }),
});

export default tasksUISlice.reducer;
