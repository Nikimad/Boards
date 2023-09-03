import { all } from "redux-saga/effects";
import boardsSaga from "./sagas/boards/boardsSaga";
import tasksSaga from "./sagas/tasks/tasksSaga";

function* rootSaga() {
  yield all([boardsSaga(), tasksSaga()]);
}

export default rootSaga;
