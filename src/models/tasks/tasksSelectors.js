import { createSelector } from "@reduxjs/toolkit";
import { boardByIdSelector } from "../boards/boardsSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const tasksSelector = (boardId, filter) =>
  createSelector(
    rootSelector,
    boardByIdSelector(boardId),
    ({ tasks }, currentBoard) => {
      if (!Boolean(currentBoard)) {
        return {
          isBoardExist: false,
          tasks: [],
          filtredLength: 0,
          length: 0,
        };
      }

      const queryRegExp = new RegExp(filter, "i");
      const currentTasks = currentBoard.tasksIds.reduce((acc, id) => {
        const { title, subtasks } = tasks[id];
        const words = [
          title.trim(),
          ...subtasks.map((subtask) => subtask.title.trim()),
        ].join(" ");

        acc = queryRegExp.test(words) ? [...acc, tasks[id]] : acc;

        return acc;
      }, []);

      return {
        tasks: currentTasks,
        filtredLength: currentTasks.length,
        length: currentBoard.tasksIds.length,
        isBoardExist: true,
      };
    }
  );

export const taskByIdSelector = (id) =>
  createSelector(rootSelector, ({ tasks }) => tasks[id]);
