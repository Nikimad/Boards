import { call, put, delay, takeEvery, takeLatest } from "redux-saga/effects";
import tasksApi from "../../../api/tasksApi";
import {
  fetchTasks,
  fetchTasksSuccess,
  addTask,
  updateTask,
  removeTask,
  setIsError,
  fetchTask,
  postTask,
  patchTask,
  deleteTask,
} from "../../slices/tasks/tasksSlice";

export function* getTasksWorker({ payload }) {
  try {
    Boolean(payload.searchParams) ? yield delay(250) : yield delay();
    const data = yield call(tasksApi.getTasks, payload);
    yield put(fetchTasksSuccess(data));
  } catch(e) {
    yield put(setIsError(e.message));
  }
}

function* getTaskWorker({ payload }) {
  try {
    const data = yield call(tasksApi.getTask, payload);
    yield put(addTask(data));
  } catch(e) {
    yield put(setIsError(e.message));
  }
}

function* postTaskWorker({ payload: { values, boardId, searchParams } }) {
  try {
    yield call(tasksApi.postTask, values);
    const data = yield call(tasksApi.getTasks, { boardId, searchParams });
    yield put(fetchTasksSuccess(data));
  } catch(e) {
    yield put(setIsError(e.message));
  }
}

function* patchTaskWorker({ payload: { values } }) {
  try {
    const { id, ...changes } = yield call(tasksApi.patchTask, values);
    yield put(updateTask({ id, changes }));
  } catch(e) {
    yield put(setIsError(e.message));
  }
}

function* deleteTaskWorker({ payload }) {
  try {
    yield call(tasksApi.deleteTask, payload);
    yield put(removeTask(payload));
  } catch(e) {
    yield put(setIsError(e.message));
  }
}

function* watchTasks() {
  yield takeLatest(fetchTasks, getTasksWorker);
  yield takeEvery(fetchTask, getTaskWorker);
  yield takeEvery(postTask, postTaskWorker);
  yield takeEvery(patchTask, patchTaskWorker);
  yield takeEvery(deleteTask, deleteTaskWorker);
}

export default watchTasks;
