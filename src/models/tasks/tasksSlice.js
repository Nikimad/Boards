import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { deleteBoard } from "../boards/boardsSlice";

const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await fetch(`/api/tasks`);
  return await res.json();
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...task, createdAt: Date.now() }),
  });
  return await res.json();
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", (id) => {
  fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, ...values }) => {
    fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
      .addCase(fetchTasks.fulfilled, tasksAdapter.setAll)
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

export const tasksSelectors = tasksAdapter.getSelectors(({ tasks }) => tasks);
export default tasksSlice.reducer;
