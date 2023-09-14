import { createSelector } from "@reduxjs/toolkit";
import { adapter } from ".";
import getSelectors from "../../helpers/getSelectors";

export const boardsSelectors = getSelectors(
  adapter,
  createSelector(
    (state) => state,
    ({ boards }) => boards
  )
);
