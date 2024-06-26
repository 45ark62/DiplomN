import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Statistics.module.css";
import { Context } from "../index";
import NavBar from "../components/NavBar";
import { observer } from "mobx-react-lite";
import UserBlockStat from "../components/UserBlockStat";
import AttemptHistory from "../components/AttemptHistory";
import AttemptByTest from "../components/AttemptByTest";
import StatisticByTest from "../components/StatisticByTest";

const Statistics = observer(() => {
  const [showAttemptHistory, setAttemptHistory] = useState(true);
  const [showAttemptByTest, setAttemptByTest] = useState(false);
  const [showStatistic, setStatistic] = useState(false);
  const { Attempts, users } = useContext(Context);

  const AttemptHistoryClick = () => {
    setAttemptHistory(true);
    setAttemptByTest(false);
    setStatistic(false);
  };

  const AttemptByTestClick = () => {
    setAttemptHistory(false);
    setAttemptByTest(true);
    setStatistic(false);
  };

  const AttemptStatisticClick = () => {
    setAttemptHistory(false);
    setAttemptByTest(false);
    setStatistic(true);
  };

  useEffect(() => {
    // Вызываем AttemptHistoryClick сразу после монтирования
    AttemptHistoryClick();
  }, []); // Пустой массив зависимостей означает, что эффект будет запущен только один раз после монтирования

  return (
    <div>
      <div className={classes.part1}>
        {users.loggedIn ? (
          <div className={classes.BlockLeft}>
            <UserBlockStat
              AttemptByTestClick={AttemptByTestClick}
              AttemptHistoryClick={AttemptHistoryClick}
              AttemptStatisticClick={AttemptStatisticClick}
            />
          </div>
        ) : null}
        <div className={classes.CardsAndMenu}>
          <NavBar />
          <div className={classes.MainBlock}>
            {showAttemptHistory && (
              <div>
                <AttemptHistory />
              </div>
            )}
            {showAttemptByTest && (
              <div>
                <AttemptByTest />
              </div>
            )}
            {showStatistic && (
              <div>
                <StatisticByTest />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Statistics;
