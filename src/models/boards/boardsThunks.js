import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBoards = createAsyncThunk(
  "boards/getBoards",
  async (searchParams) => {
    const res = await fetch(
      `/api/boards${searchParams ? `?title_like=${searchParams}` : ""}`
    );
    return await res.json();
  }
);

export const postBoard = createAsyncThunk(
  "boards/postBoard",
  ({ board, searchParams }) => {
    fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(board),
    });
    return { board, searchParams };
  }
);

export const deleteBoard = createAsyncThunk("boards/deleteBoard", (id) => {
  fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const patchBoard = createAsyncThunk(
  "boards/patchBoard",
  ({ board: { id, ...values } }) => {
    fetch(`/api/boards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(values),
    });
    return { id, changes: values };
  }
);
