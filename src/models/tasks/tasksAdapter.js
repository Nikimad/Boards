import { createEntityAdapter } from "@reduxjs/toolkit";

export const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
