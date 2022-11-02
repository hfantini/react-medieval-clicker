import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from 'react-router-dom'

const element = document.getElementById("root");

if(element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <Router>
      <App></App>
    </Router>
  );
}

reportWebVitals();
