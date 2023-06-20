import { createSelector } from "@reduxjs/toolkit";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.boards
);

export const boardsSelector = (filter) =>
  createSelector(rootSelector, ({ boards, boardsIds }) => {
    const fitredBoards = boardsIds.reduce((filtredBoards, id) => {
      const queryRegExp = new RegExp(filter, "i");

      filtredBoards = queryRegExp.test(boards[id].title)
        ? [...filtredBoards, boards[id]]
        : filtredBoards;
      
      return filtredBoards;
    }, []);

    return {
      boards: fitredBoards,
      length: boardsIds.length,
      filtredLength: fitredBoards.length,
    };
  }
  );

export const boardByIdSelector = (id) =>
  createSelector(rootSelector, ({ boards }) => boards[id]);
