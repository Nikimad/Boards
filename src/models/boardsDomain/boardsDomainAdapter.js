import { createEntityAdapter } from "@reduxjs/toolkit";

export const boardsDomainAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
