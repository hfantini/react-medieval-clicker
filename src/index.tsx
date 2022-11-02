import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const element = document.getElementById("root");

if(element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  );
}

reportWebVitals();
