import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { LoaderContextProvider } from "./LoaderContext";
import { AuthenticationContextProvider } from "./services/AuthService";
import { AlertContextProvider } from "./services/AlertService";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={<Loader />}>
    <LoaderContextProvider>
      <AuthenticationContextProvider>
        <AlertContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </AlertContextProvider>
      </AuthenticationContextProvider>
    </LoaderContextProvider>
  </Suspense>

  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
