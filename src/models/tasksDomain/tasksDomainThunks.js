import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  "tasks/getTasks",
  async ({ boardId, query }) => {
    const res = await fetch(
      `/api/boards/${boardId}/tasks${!query ? "" : `?q=${query}`}`
    );
    return await res.json();
  }
);

export const addTask = createAsyncThunk("tasks/addTask", (payload) => {
  fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(payload.task),
  });
  return payload;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", (id) => {
  fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const editTask = createAsyncThunk(
  "tasks/editTask",
  ({ task: { id, ...values }}) => {
    fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(values),
    });
    return { id, changes: values };
  }
);
