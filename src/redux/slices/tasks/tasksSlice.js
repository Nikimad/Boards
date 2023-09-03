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
    fetchTasks(state) {
      state.isLoading = true;
    },
    fetchTasksSuccess(state, { payload }) {
      adapter.addMany(state, payload);
      const visibleIds = payload.map(({ id }) => id);
      state.visibleIds = visibleIds.sort((a, b) => b - a);
      state.isLoading = false;
    },
    setIsError(state, { payload }) {
      state.error = payload;
      state.isError = true;
    },
    resetIsError(state) {
      state.error = null;
      state.isError = false;
    },
    addTask: adapter.addOne,
    updateTask: adapter.updateOne,
    removeTask(state, { payload }) {
      adapter.removeOne(state, payload);
      state.visibleIds = state.visibleIds.filter((id) => id !== payload);
    },
  },
});

export const fetchTask = createAction(`${tasksSlice.name}/fetchTask`);
export const postTask = createAction(`${tasksSlice.name}/postTask`);
export const patchTask = createAction(`${tasksSlice.name}/patchTask`);
export const deleteTask = createAction(`${tasksSlice.name}/deleteTask`);

export const {
  fetchTasks,
  fetchTasksSuccess,
  addTask,
  updateTask,
  removeTask,
  setIsError,
  resetIsError,
} = tasksSlice.actions;

export const tasksSelectors = getSelectors(
  adapter,
  createSelector(
    (state) => state,
    ({ tasks }) => tasks
  )
);

export default tasksSlice.reducer;
