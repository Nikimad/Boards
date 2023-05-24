import { createSelector } from "@reduxjs/toolkit";
import {
  activeBoardIdSelector,
  activeTaskIdSelector,
  filterSelector,
} from "../view/viewSelectors";

const rootSelector = createSelector(
  (state) => state,
  (state) => state.tasks
);

export const tasksSelector = createSelector(
  rootSelector,
  activeBoardIdSelector,
  filterSelector,
  ({ tasks, tasksIds }, boardId, filter) => {
    const queryRegExp = new RegExp(filter, "i");
    const { items, length } = tasksIds.reduce(
      (acc, id) => {
        if (tasks[id].boardId === boardId) {
          acc.length += 1;
          const { title, subtasks } = tasks[id];
          const words = [
            title.trim(),
            ...subtasks.map((subtask) => subtask.title.trim()),
          ].join(" ");

          acc.items = queryRegExp.test(words)
            ? [...acc.items, tasks[id]]
            : acc.items;
        }
        return acc;
      },
      {
        items: [],
        length: 0,
      }
    );

    return {
      tasks: items,
      length: items.length,
      genLength: length,
    };
  }
);

export const activeTaskSelector = createSelector(
  rootSelector,
  activeTaskIdSelector,
  ({ tasks }, id) => tasks[id]
);
