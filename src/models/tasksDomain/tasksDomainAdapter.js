import { createEntityAdapter } from "@reduxjs/toolkit";

export const tasksDomainAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
