import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async ({ boardId, searchParams }) => {
    const res = await fetch(
      `/api/boards/${boardId}/tasks${!searchParams ? "" : `?q=${searchParams}`}`
    );
    return await res.json();
  }
);

export const postTask = createAsyncThunk(
  "tasks/postTask",
  ({ task, searchParams }) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(task),
    });
    return { task, searchParams };
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", (id) => {
  fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const patchTask = createAsyncThunk(
  "tasks/patchTask",
  ({ task: { id, ...values } }) => {
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
