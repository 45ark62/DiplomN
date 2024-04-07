import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PrimaryTestStore from "./store/PrimaryTestStore";
import TrainStore from "./store/TrainStore";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import UserStore from "./store/UserStore";
import StatisticStore from "./store/StatStore";
import StatisticStoreForTrainPage from "./store/StatStoreForTrainPage";
import SecondTestStore from "./store/SecondTestStore";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      primaryTest: new PrimaryTestStore(),
      secondTest: new SecondTestStore(),
      train: new TrainStore(),
      users: new UserStore(),
      Attempts: new StatisticStore(),
      AttemptsForTrain: new StatisticStoreForTrainPage(),
    }}
  >
    <Router>
      <App />
    </Router>
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
