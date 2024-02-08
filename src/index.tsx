import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import NewEmployee from "./components/NewEmployee";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import express from "express";
import { Sequelize } from "sequelize-typescript";

//1. populate form with data
//2. Query parameter
//3. Wrap nav bar
//4. Break up code to individual component
//5. reduce use effect
//6. useLocation/useParams

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
