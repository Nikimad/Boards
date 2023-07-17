import { tasksDomainAdapter } from "./tasksDomainAdapter";
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask, editTask, deleteTask } from "./tasksDomainThunks";
import { deleteBoard } from "../boardsDomain/boardsDomainThunks";

const tasksDomainSlice = createSlice({
  name: "tasks",
  initialState: tasksDomainAdapter.getInitialState(),
  extraReducers: (builder) =>
    builder
      .addCase(fetchTasks.fulfilled, tasksDomainAdapter.addMany)
      .addCase(addTask.fulfilled, (state, { payload: { task } }) =>
        tasksDomainAdapter.addOne(state, task)
      )
      .addCase(deleteTask.fulfilled, tasksDomainAdapter.removeOne)
      .addCase(editTask.fulfilled, tasksDomainAdapter.updateOne)
      .addCase(deleteBoard, (state, { payload }) => {
        const { entities, ids } = state;
        const tasksIds = ids.filter(
          (taskId) => entities[taskId].boardId === payload
        );
        tasksDomainAdapter.removeMany(state, tasksIds);
      }),
});

export default tasksDomainSlice.reducer;
