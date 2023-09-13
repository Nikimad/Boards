import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
} from "redux-saga/effects";
import boardsApi from "../api/boardsApi";
import tasksApi from "../api/tasksApi";
import { boardsActions } from "./slices/boards/boardsSlice";
import { tasksActions } from "./slices/tasks/tasksSlice";

function* getBoards({ payload }) {
  try {
    if (Boolean(payload)) yield delay(250);
    const boards = yield call(boardsApi.getBoards, payload);
    yield put(boardsActions.getBoardsSuccess(boards));
  } catch (e) {
    yield put(boardsActions.setIsError(e.message));
  }
}

function* getBoard({ payload }) {
  try {
    const data = yield call(boardsApi.getBoard, payload);
    yield put(boardsActions.getBoardSuccess(data));
  } catch (e) {
    yield put(boardsActions.setIsError(e.message));
  }
}

function* createBoard({ payload: { values, searchParams } }) {
  try {
    yield call(boardsApi.postBoard, values);
    const boards = yield call(boardsApi.getBoards, searchParams);
    yield put(boardsActions.getBoardsSuccess(boards));
  } catch (e) {
    yield put(boardsActions.setIsError(e));
  }
}

function* editBoard({ payload: { values } }) {
  try {
    const { id, ...changes } = yield call(boardsApi.patchBoard, values);
    yield put(boardsActions.editBoardSuccess({ id, changes }));
  } catch (e) {
    yield put(boardsActions.setIsError(e.message));
  }
}

function* deleteBoard({ payload }) {
  try {
    yield call(boardsApi.deleteBoard, payload);
    yield put(boardsActions.deleteBoardSucces(payload));
  } catch (e) {
    yield put(boardsActions.setIsError(e.message));
  }
}

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

function* boardsSaga() {
  yield takeLatest(boardsActions.getBoards, getBoards);
  yield takeEvery(boardsActions.getBoard, getBoard);
  yield takeEvery(boardsActions.createBoard, createBoard);
  yield takeEvery(boardsActions.editBoard, editBoard);
  yield takeEvery(boardsActions.deleteBoard, deleteBoard);
}

function* tasksSaga() {
  yield takeLatest(tasksActions.getTasks, getTasks);
  yield takeEvery(tasksActions.getTask, getTask);
  yield takeEvery(tasksActions.createTask, createTask);
  yield takeEvery(tasksActions.editTask, editTask);
  yield takeEvery(tasksActions.deleteTask, deleteTask);
}

function* rootSaga() {
  yield all([boardsSaga(), tasksSaga()]);
}

export default rootSaga;
