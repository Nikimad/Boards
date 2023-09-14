import { all } from "redux-saga/effects";
import boardsSaga from "./boards/sagas";
import tasksSaga from "./tasks/sagas";

function* rootSaga() {
  yield all([boardsSaga(), tasksSaga()]);
}

export default rootSaga;
