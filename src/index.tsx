import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./contexts/MainContext";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const basename = process.env.PUBLIC_URL;

root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <MainContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MainContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
