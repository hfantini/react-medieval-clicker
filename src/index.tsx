import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from 'react-router-dom'
import store from "./app/store";
import { Provider } from "react-redux";

const element = document.getElementById("root");

if(element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <Provider store={store}>
      <Router>
        <App></App>
      </Router>
    </Provider>
  );
}

reportWebVitals();
