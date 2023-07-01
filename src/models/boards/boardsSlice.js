import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const boardsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const res = await fetch("/api/boards");
  return await res.json();
});

export const addBoard = createAsyncThunk("boards/addBoard", async (board) => {
  const res = await fetch("/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...board, createdAt: Date.now() }),
  });
  return await res.json();
});

export const deleteBoard = createAsyncThunk("boards/deleteBoard", (id) => {
  fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const editBoard = createAsyncThunk(
  "boards/editBoard",
  async ({ id, ...values }) => {
    fetch(`/api/boards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
      .addCase(fetchBoards.fulfilled, boardsAdapter.setAll)
      .addCase(addBoard.fulfilled, boardsAdapter.addOne)
      .addCase(deleteBoard.fulfilled, boardsAdapter.removeOne)
      .addCase(editBoard.fulfilled, boardsAdapter.updateOne),
});

export const boardsSelectors = boardsAdapter.getSelectors(
  ({ boards }) => boards
);
export default boardsSlice.reducer;
