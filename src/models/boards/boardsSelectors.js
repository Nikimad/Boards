import { createSelector } from "@reduxjs/toolkit";
import { boardsAdapter } from "./boardsAdapter";
import getExtendedSelectors from "../../helpers/getExtendedSelectors";

const rootSelector = createSelector(
  (state) => state,
  ({ boards }) => boards
);

export const boardsSelectors = getExtendedSelectors(boardsAdapter, rootSelector);
