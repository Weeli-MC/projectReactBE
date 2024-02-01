import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import NewEmployee from "./components/NewEmployee";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import express from "express";
import { Sequelize } from "sequelize-typescript";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AddEmployee" element={<NewEmployee />} />
      </Routes>
    </Router>
  </Provider>
);
