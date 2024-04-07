import "./App.css";
import PrimaryTest from "./pages/PrimaryTest";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TestBlok from "./components/TestBlok";
import Card from "./components/Card";
import CardTrain from "./components/CardTrain";
import Registration from "./pages/Registration";
import Train from "./pages/Train";
import TrainingTestsPage from "./pages/TrainingTestsPage";
import { Route, Routes } from "react-router-dom";
import TrainTest from "./components/TrainTest";
import About from "./pages/About";
import Statistic from "./pages/Statistics";
import { Context } from "./index";
import React, { useContext, useEffect } from "react";
import StatisticsForTrainPage from "./pages/StatisticsForTrainPage";
import SecondTrainTest from "./components/SecondTrainTest";
function App() {
  const { users } = useContext(Context);
  console.log(process.env.REACT_APP_BASE_URL);
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (isUserLoggedIn == "1") {
      users.setLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/Card/:id/TrainTest" element={<TrainTest />} />
        <Route path="/Card/:id" element={<Card />} />
        <Route path="/CardTrain/:id" element={<CardTrain />} />
        <Route path="/Train" element={<Train />} />
        <Route path="/TrainigTestsPage" element={<TrainingTestsPage />} />
        <Route path="/Login/*" element={<Login />} />

        <Route path="/Registration/*" element={<Registration />} />
        <Route path="/TestBlok/*" element={<TestBlok />} />
        <Route path="/PrimaryTest" element={<PrimaryTest />} />
        <Route path="/userStatistic" element={<Statistic />} />
        <Route path="/secondTrainTest" element={<SecondTrainTest />} />
        <Route path="/trainStatistic" element={<StatisticsForTrainPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
