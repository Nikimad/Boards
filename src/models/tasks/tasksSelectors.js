import { createSelector } from "@reduxjs/toolkit";
import { tasksAdapter } from "./tasksAdapter";
import getExtendedSelectors from "../../helpers/getExtendedSelectors";

const rootSelector = createSelector(
  (state) => state,
  ({ tasks }) => tasks
);

export const tasksSelectors = getExtendedSelectors(tasksAdapter, rootSelector);
