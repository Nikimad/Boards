import { all } from "redux-saga/effects";
import boardsSaga from "./sagas/boardsSaga/boardsSaga";
import tasksSaga from "./sagas/tasksSaga/tasksSaga";

function* rootSaga() {
  yield all([boardsSaga(), tasksSaga()]);
}

export default rootSaga;
