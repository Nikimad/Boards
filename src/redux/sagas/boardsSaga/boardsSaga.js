import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import boardsApi from "../../../api/boardsApi";
import {
  fetchBoards,
  fetchBoardsSuccess,
  addBoard,
  updateBoard,
  removeBoard,
  setIsError,
  fetchBoard,
  postBoard,
  patchBoard,
  deleteBoard,
} from "../../slices/boards/boardsSlice";

function* getBoardsWorker({ payload }) {
  try {
    if (Boolean(payload)) yield delay(250);
    const boards = yield call(boardsApi.getBoards, payload);
    yield put(fetchBoardsSuccess(boards));
  } catch {
    yield put(setIsError());
  }
}

function* getBoardWorker({ payload }) {
  try {
    const data = yield call(boardsApi.getBoard, payload);
    yield put(addBoard(data));
  } catch {
    yield put(setIsError());
  }
}

function* postBoardWorker({ payload: { values, searchParams } }) {
  try {
    yield call(boardsApi.postBoard, values);
    const data = yield call(boardsApi.getBoards, searchParams);
    yield put(fetchBoardsSuccess(data));
  } catch {
    yield put(setIsError());
  }
}

function* patchBoardWorker({ payload: { values } }) {
  try {
    const { id, ...changes } = yield call(boardsApi.patchBoard, values);
    yield put(updateBoard({ id, changes }));
  } catch {
    yield put(setIsError());
  }
}

function* deleteBoardWorker({ payload }) {
  try {
    yield call(boardsApi.deleteBoard, payload);
    yield put(removeBoard(payload));
  } catch {
    yield put(setIsError());
  }
}

function* watchBoards() {
  yield takeLatest(fetchBoards, getBoardsWorker);
  yield takeEvery(fetchBoard, getBoardWorker);
  yield takeEvery(postBoard, postBoardWorker);
  yield takeEvery(patchBoard, patchBoardWorker);
  yield takeEvery(deleteBoard, deleteBoardWorker);
}

export default watchBoards;
