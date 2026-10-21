import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { reset } from "./db";

declare global {
  interface Window {
    resetBoardsDb: () => void;
  }
}

export const worker = setupWorker(...handlers);

// Dev helper: run `resetBoardsDb()` in the browser console to restore the initial data
window.resetBoardsDb = () => {
  reset();
  window.location.reload();
};
