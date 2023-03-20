import { createEntityAdapter } from "@reduxjs/toolkit";

export const tasksAdapter = createEntityAdapter({
  selectId: (task) => task.id,
  sortComparer: (a, b) => b.id - a.id,
});
