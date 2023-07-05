import { tasksAdapter } from "./tasksAdapter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBoard } from "../boards/boardsSlice";

export const getTasks = createAsyncThunk("tasks/getTasks", async ({ boardId, query }) => {
  const res = await fetch(`/boards/${boardId}/tasks${!query ? "" : `?q=${query}`}`);
  return await res.json();
});

export const addTask = createAsyncThunk("tasks/addTask", (task) => {
  fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(task),
  });
  return task;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", (id) => {
  fetch(`/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const editTask = createAsyncThunk(
  "tasks/editTask",
  ({ id, ...values }) => {
    fetch(`/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(values),
    });
    return { id, changes: values };
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  extraReducers: (builder) =>
    builder
      .addCase(getTasks.fulfilled, tasksAdapter.setAll)
      .addCase(addTask.fulfilled, tasksAdapter.addOne)
      .addCase(deleteTask.fulfilled, tasksAdapter.removeOne)
      .addCase(editTask.fulfilled, tasksAdapter.updateOne)
      .addCase(deleteBoard, (state, { payload: id }) => {
        const { entities, ids } = state;
        const tasksIds = ids.filter(
          (taskId) => entities[taskId].boardId === id
        );
        tasksAdapter.removeMany(state, tasksIds);
      }),
});

export default tasksSlice.reducer;
