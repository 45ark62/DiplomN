import { Link, useNavigate } from "react-router-dom";
import classes from "../pages/Home.module.css";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import About from "../pages/About";
import { getStatAttempts } from "../API/StatAPI";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import Row from "./Row";

const AttemptHistory = observer(() => {
  const { Attempts, users } = useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getStatHistory = async () => {
    try {
      const response = await getStatAttempts();
      console.log("at :", response.data);
      Attempts.setStat(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    getStatHistory();
  }, []);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
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
        Журнал попыток
      </p>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label htmlFor="startDatePicker" style={{ fontWeight: "bold" }}>
          Начальная дата:
        </label>
        <input
          style={{ width: "500px" }}
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
          style={{ width: "500px" }}
          type="date"
          id="endDatePicker"
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
      </div>

      <Table striped bordered hover style={{ background: "white" }}>
        <thead>
          <tr style={{ backgroundColor: "#30173d", color: "white" }}>
            <th>№</th>
            <th>Название тренажёра</th>
            <th>Балл</th>
            <th>Попытка</th>
            <th>Дата</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          {Attempts.StatAttemptStore.map((oneRow, index) => {
            // Применяем фильтрацию по диапазону дат
            if (
              (!startDate || oneRow.date >= startDate) &&
              (!endDate || oneRow.date <= endDate)
            ) {
              return (
                <Row
                  key={index}
                  rowNumber={index + 1}
                  id={oneRow.testId}
                  testName={oneRow.testName}
                  attempt={oneRow.attempt}
                  score={oneRow.score}
                  date={oneRow.date}
                />
              );
            }
            return null;
          })}
        </tbody>
      </Table>
    </>
  );
});

export default AttemptHistory;
