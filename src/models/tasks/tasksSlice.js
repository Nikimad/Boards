import { createSlice } from "@reduxjs/toolkit";
import { removeBoard, setActiveBoardId } from "../boards/boardsSlice";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    activeTaskId: null,
    tasks: {},
    tasksIds: [],
  },
  reducers: {
    setActiveTaskId(state, { payload }) {
      state.activeTaskId = payload;
    },
    addTask(state, { payload }) {
      const { id, ...values } = payload;
      state.tasks[id] = { id, ...values };
      state.tasksIds = [id, ...state.tasksIds];
    },
    editTask(state, { payload }) {
      const { id, subtasks, checkedSubtasks, ...values } = payload;
      state.tasks[id] = {
        ...state.tasks[id],
        subtasks,
        checkedSubtasks: subtasks.reduce((arr, {id}) => {
          if (checkedSubtasks.includes(String(id))) {
            arr = [...arr, String(id)];
          }
          return arr;
        }, []),
        ...values,
      };
    },
    removeTask(state, { payload }) {
      state.activeTaskId = null;
      delete state.tasks[payload];
      state.tasksIds = state.tasksIds.filter((id) => id !== payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(removeBoard, (state, { payload }) => {
        const deletedTasksId = Object.entries(state.tasks).filter(
          ([id, task]) => {
            if (task.boardId === payload) return id;
          }
        );
        state.tasksIds = state.tasksIds.filter(
          (id) => !deletedTasksId.includes(id)
        );
        state.tasks = state.tasksIds.reduce((tasks, id) => {
          tasks[id] = state.tasks[id];
          return tasks;
        }, {});
        state.activeTaskId = null;
      })
      .addCase(setActiveBoardId, (state) => {
        state.activeTaskId = null;
      });
  },
});

export const { setActiveTaskId, addTask, editTask, removeTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
