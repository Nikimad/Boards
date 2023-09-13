import {
  createSlice,
  createEntityAdapter,
  createSelector,
  createAction,
} from "@reduxjs/toolkit";
import getSelectors from "../../../helpers/getSelectors";

export const adapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: adapter.getInitialState({
    visibleIds: [],
    isLoading: true,
    isError: false,
    error: null,
  }),
  reducers: {
    getTasks(state) {
      state.isLoading = true;
    },
    getTasksSuccess(state, { payload }) {
      adapter.addMany(state, payload);
      const visibleIds = payload.map(({ id }) => id);
      state.visibleIds = visibleIds.sort((a, b) => b - a);
      state.isLoading = false;
    },
    getTask(state) {
      return state;
    },
    getTaskSuccess: adapter.addOne,
    createTask(state) {
      return state;
    },
    editTask(state, { payload }) {
      payload.values.checkedSubtasks = payload.values.checkedSubtasks.filter(
        (id) =>
          payload.values.subtasks.some((subtask) => String(subtask.id) === id)
      );
      return state;
    },
    editTaskSuccess: adapter.updateOne,
    deleteTask(state) {
      return state;
    },
    deleteTaskSuccess(state, { payload }) {
      adapter.removeOne(state, payload);
      state.visibleIds = state.visibleIds.filter((id) => id !== payload);
    },
    setIsError(state, { payload }) {
      state.error = payload;
      state.isError = true;
    },
    resetIsError(state) {
      state.error = null;
      state.isError = false;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export const tasksSelectors = getSelectors(
  adapter,
  createSelector(
    (state) => state,
    ({ tasks }) => tasks
  )
);

export default tasksSlice.reducer;
