import { createSelector } from "@reduxjs/toolkit";
import { activeBoardIdSelector } from "../boards/boardsSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const tasksSelector = (query) =>
  createSelector(
    rootSelector,
    activeBoardIdSelector,
    ({ tasks, tasksIds }, boardId) => {
      const queryRegEx = new RegExp(query.trim(), "i");

      const actualTasks = tasksIds.reduce((acc, id) => {
        if (tasks[id].boardId === boardId) {
          acc.length += 1;
          const { title, subtasks } = tasks[id];
          const words = [
            title,
            ...subtasks.map((subtask) => subtask.title),
          ].join(" ");

          acc.tasks = queryRegEx.test(words) ? [...acc.tasks, tasks[id]] : acc.tasks;
        }
        return acc;
      }, {
        tasks: [],
        length: 0
      });

      return {
        tasks: actualTasks.tasks,
        length: actualTasks.tasks.length,
        genLength: actualTasks.length,
      };
    }
  );

export const activeTaskSelector = createSelector(
  rootSelector,
  ({ tasks, activeTaskId }) => tasks[activeTaskId]
);
