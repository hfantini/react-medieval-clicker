import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const element = document.getElementById("root");

if(element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      blabla
    </React.StrictMode>
  );
}

reportWebVitals();
