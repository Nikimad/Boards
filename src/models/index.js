import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import boards from "./boards";
import tasks from "./tasks";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    boards,
    tasks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
