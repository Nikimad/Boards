import { createSelector } from "@reduxjs/toolkit";
import { adapter } from ".";
import getSelectors from "../../helpers/getSelectors";

export const tasksSelectors = getSelectors(
  adapter,
  createSelector(
    (state) => state,
    ({ tasks }) => tasks
  )
);
