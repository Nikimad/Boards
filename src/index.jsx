import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./styles/global.scss";

const enableMocking = async () => {
  if (import.meta.env.VITE_USE_MOCKS === "false") return;
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledFrame: "bypass",
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
};

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
);
