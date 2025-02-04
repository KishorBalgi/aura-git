import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { UserProvider } from "./Contexts/userContext";
import { inject } from "@vercel/analytics";

inject();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <HashRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </HashRouter>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
