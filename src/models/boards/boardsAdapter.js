import { createEntityAdapter } from "@reduxjs/toolkit";

export const boardsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
