import { Link, useNavigate } from "react-router-dom";
import classes from "../pages/Statistics.module.css";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import About from "../pages/About";
import { getStatAttemptsForTrainPage } from "../API/StatAPI";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import Row from "./Row";
import { client, loggedInClient } from "../API/index";
import Form from "react-bootstrap/Form";
import RowForTrainPage from "./RowForTrainPage";

const AttemptByTestForTrainPage = observer(() => {
  const { AttemptsForTrain, users } = useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [AttemptByIdTest, setAttemptByIdTest] = useState(null);
  const uniqueTestIds = [
    ...new Set(
      AttemptsForTrain.StatAttemptStoreForTrainPage.map((row) => row.testId)
    ),
  ];

  const getStatHistory = async () => {
    try {
      const response = await getStatAttemptsForTrainPage();
      console.log("at :", response.data);
      AttemptsForTrain.setStat(response.data);
      const getAttemptById = await loggedInClient.get(
        `/api/trainHistory/${AttemptsForTrain.id}`
      );
      setAttemptByIdTest(getAttemptById.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    getStatHistory();
    if (uniqueTestIds.length > 0) {
      setSelectedTestId(uniqueTestIds[0]);
    }
  }, []);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const handleTestIdChange = (event) => {
    setSelectedTestId(event.target.value);
  };

  return (
    <>
      <p
        style={{
          marginTop: "30px",
          marginBottom: "50px",
          fontSize: "25px",
          textAlign: "center",
          color: "#30173d",
          fontWeight: "bold",
        }}
      >
        Попытки по тренажёрам
      </p>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label htmlFor="startDatePicker" style={{ fontWeight: "bold" }}>
          Начальная дата:
        </label>
        <input
          className={classes.startDate}
          type="date"
          id="startDatePicker"
          onChange={(e) => handleStartDateChange(e.target.value)}
        />

        <label
          htmlFor="endDatePicker"
          style={{ marginLeft: "20px", fontWeight: "bold" }}
        >
          Конечная дата:
        </label>
        <input
          className={classes.startDate}
          type="date"
          id="endDatePicker"
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
        <div>
          <label
            htmlFor="testIdSelector"
            style={{ marginTop: "30px", fontWeight: "bold" }}
          >
            Выберите тренажёр:
          </label>
          <Form.Select
            asize="lg"
            id="testIdSelector"
            onChange={handleTestIdChange}
            value={selectedTestId}
            className={classes.ListFilter}
          >
            {uniqueTestIds.map((testId) => (
              <option key={testId} value={testId}>
                {
                  AttemptsForTrain.StatAttemptStoreForTrainPage.find(
                    (row) => row.testId === testId
                  )?.testName
                }
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <Table striped bordered hover style={{ background: "white" }}>
        <thead>
          <tr style={{ backgroundColor: "#30173d", color: "white" }}>
            <th>№</th>
            <th>Название тренажёра</th>
            <th>Балл</th>
            <th>Время прохождения(сек)</th>
            <th>Попытка</th>
            <th>Дата</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          {AttemptsForTrain.StatAttemptStoreForTrainPage.map(
            (oneRow, index) => {
              // Применяем фильтрацию по диапазону дат и testId
              if (
                (!startDate || oneRow.date >= startDate) &&
                (!endDate || oneRow.date <= endDate) &&
                (!selectedTestId || oneRow.testId === selectedTestId)
              ) {
                return (
                  <RowForTrainPage
                    key={index}
                    rowNumber={index + 1}
                    id={oneRow.testId}
                    attempt={oneRow.attempt}
                    score={oneRow.score}
                    date={oneRow.date}
                    testName={oneRow.testName}
                    time={oneRow.time}
                  />
                );
              }
              return null;
            }
          )}
        </tbody>
      </Table>
    </>
  );
});

export default AttemptByTestForTrainPage;
