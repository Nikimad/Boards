import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import boardsApi from "../../api/boardsApi";
import { boardsActions } from ".";

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

function* boardsSaga() {
  yield takeLatest(boardsActions.getBoards, getBoards);
  yield takeEvery(boardsActions.getBoard, getBoard);
  yield takeEvery(boardsActions.createBoard, createBoard);
  yield takeEvery(boardsActions.editBoard, editBoard);
  yield takeEvery(boardsActions.deleteBoard, deleteBoard);
}

export default boardsSaga;
