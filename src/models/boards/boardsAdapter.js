import { createEntityAdapter } from "@reduxjs/toolkit";

export const boardsAdapter = createEntityAdapter({
  selectId: (board) => board.id,
  sortComparer: (a, b) => b.id - a.id,
});
