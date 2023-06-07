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
    ({ tasks }, { tasksIds }) => {
      const queryRegExp = new RegExp(filter, "i");
      const currentTasks = tasksIds.reduce((acc, id) => {
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
        length: tasksIds.length,
      };
    }
  );

export const taskByIdSelector = (id) =>
  createSelector(rootSelector, ({ tasks }) => tasks[id]);
