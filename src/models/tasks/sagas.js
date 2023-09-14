import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import tasksApi from "../../api/tasksApi";
import { tasksActions } from ".";

function* getTasks({ payload }) {
  try {
    if (Boolean(payload.searchParams)) yield delay(250);
    const tasks = yield call(tasksApi.getTasks, payload);
    yield put(tasksActions.getTasksSuccess(tasks));
  } catch (e) {
    yield put(tasksActions.setIsError(e.message));
  }
}

function* getTask({ payload }) {
  try {
    const task = yield call(tasksApi.getTask, payload);
    yield put(tasksActions.getTaskSuccess(task));
  } catch (e) {
    yield put(tasksActions.setIsError(e.message));
  }
}

function* createTask({ payload: { values, boardId, searchParams } }) {
  try {
    yield call(tasksApi.postTask, values);
    const tasks = yield call(tasksApi.getTasks, { boardId, searchParams });
    yield put(tasksActions.getTasksSuccess(tasks));
  } catch (e) {
    yield put(tasksActions.setIsError(e.message));
  }
}

function* editTask({ payload: { values } }) {
  try {
    const { id, ...changes } = yield call(tasksApi.patchTask, values);
    yield put(tasksActions.editTaskSuccess({ id, changes }));
  } catch (e) {
    yield put(tasksActions.setIsError(e.message));
  }
}

function* deleteTask({ payload }) {
  try {
    yield call(tasksApi.deleteTask, payload);
    yield put(tasksActions.deleteTaskSuccess(payload));
  } catch (e) {
    yield put(tasksActions.setIsError(e.message));
  }
}

function* tasksSaga() {
  yield takeLatest(tasksActions.getTasks, getTasks);
  yield takeEvery(tasksActions.getTask, getTask);
  yield takeEvery(tasksActions.createTask, createTask);
  yield takeEvery(tasksActions.editTask, editTask);
  yield takeEvery(tasksActions.deleteTask, deleteTask);
}

export default tasksSaga;
