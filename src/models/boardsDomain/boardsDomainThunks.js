import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (searchParams) => {
    const res = await fetch(
      `/api/boards${searchParams ? `?title_like=${searchParams}` : ""}`
    );
    return await res.json();
  }
);

export const addBoard = createAsyncThunk("boards/addBoard", (payload) => {
  fetch("/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(payload.board),
  });
  return payload;
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", (id) => {
  fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });
  return Number(id);
});

export const editBoard = createAsyncThunk(
  "boards/editBoard",
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
