import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

import boards from "./slices/boards/boardsSlice";
import tasks from "./slices/tasks/tasksSlice";

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
