import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import classes from "./UserBlock.module.css";

const UserBlockStatForTrainPage = observer(
  ({ AttemptByTestClick, AttemptHistoryClick, AttemptStatisticClick }) => {
    const { users } = useContext(Context);
    const navigate = useNavigate();

    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName, onClickFunction) => {
      setActiveButton(buttonName);
      onClickFunction();
    };

    console.log("name", users.username);

    return (
      <>
        <div className={classes.AvatarUser}></div>
        <div className={classes.username}>{users._user.username}</div>
        <div className={classes.username}>{users._user.email}</div>
        <div style={{ marginTop: "100px" }}>
          <button
            className={`${classes.activeButton} ${
              activeButton !== "AttemptHistory" ? classes.BtnStat2 : ""
            }`}
            onClick={() =>
              handleButtonClick("AttemptHistory", AttemptHistoryClick)
            }
          >
            Журнал попыток
          </button>

          <button
            className={`${classes.activeButton} ${
              activeButton !== "AttemptByTest" ? classes.BtnStat2 : ""
            }`}
            onClick={() =>
              handleButtonClick("AttemptByTest", AttemptByTestClick)
            }
          >
            Попытки по тренажёрам
          </button>

          <button
            className={`${classes.activeButton} ${
              activeButton !== "AttemptStatistic" ? classes.BtnStat2 : ""
            }`}
            onClick={() =>
              handleButtonClick("AttemptStatistic", AttemptStatisticClick)
            }
          >
            Статистика по тренажёрам
          </button>
        </div>
      </>
    );
  }
);

export default UserBlockStatForTrainPage;
