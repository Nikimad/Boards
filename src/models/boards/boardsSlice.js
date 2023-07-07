import { boardsAdapter } from "./boardsAdapter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const res = await fetch("/api/boards");
  return await res.json();
});

export const addBoard = createAsyncThunk("boards/addBoard", (board) => {
  fetch("/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(board),
  });
  return board;
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", (id) => {
  fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const editBoard = createAsyncThunk(
  "boards/editBoard",
  ({ id, ...values }) => {
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

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState(),
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoards.fulfilled, boardsAdapter.addMany)
      .addCase(addBoard.fulfilled, boardsAdapter.addOne)
      .addCase(deleteBoard.fulfilled, boardsAdapter.removeOne)
      .addCase(editBoard.fulfilled, boardsAdapter.updateOne),
});

export default boardsSlice.reducer;
