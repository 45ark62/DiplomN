import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getStatAttempts } from "../API/StatAPI";
import classes from "../pages/Statistics.module.css";
import { client, loggedInClient } from "../API";
const StatisticByTest = observer(() => {
  const { Attempts } = useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [averageAllPeriod, setAverageAllPeriod] = useState(null);
  const [average2Weeks, setAverage2Weeks] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        type: "datetime", // Specify the x-axis type as datetime
      },
      colors: ["#4B0082", "#800080"],
    },
    series: [
      {
        name: "Max Score",
        data: [], // Empty array for the data, it will be filled dynamically
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatAttempts();
        Attempts.setStat(response.data);
        const uniqueTestIds = [
          ...new Set(Attempts.StatAttemptStore.map((row) => row.testId)),
        ];
        setSelectedTestId(uniqueTestIds[0]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, [Attempts]);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const getAverageAll = await loggedInClient.get(
          `/api/userHistory/average/${selectedTestId}`
        );
        setAverageAllPeriod(getAverageAll.data);
        const getAverage2Weeks = await loggedInClient.get(
          `/api/userHistory/averageLastTwoWeeks/${selectedTestId}`
        );
        setAverage2Weeks(getAverage2Weeks.data);
        console.log("all", averageAllPeriod);
        console.log("2weeks", average2Weeks);
      } catch (error) {
        console.error("Error fetching averages:", error);
      }
    };

    // Получаем средние значения при изменении selectedTestId
    fetchAverages();
  }, [selectedTestId]);

  useEffect(() => {
    // Устанавливаем начальную и конечную даты для последних двух недель
    const today = new Date();
    const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setStartDate(twoWeeksAgo.toISOString().split("T")[0]);
    setEndDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    // Update chart data when Attempts.StatAttemptStore changes
    const filteredData = Attempts.StatAttemptStore.filter(
      (row) =>
        row.testId === selectedTestId &&
        (!startDate || row.date >= startDate) &&
        (!endDate || row.date <= endDate)
    );

    // Group data by date and find the maximum score for each day
    const maxScoresByDate = {};
    filteredData.forEach((row) => {
      const date = row.date;
      const score = row.score;

      if (!maxScoresByDate[date] || score > maxScoresByDate[date]) {
        maxScoresByDate[date] = score;
      }
    });

    const chartSeriesData = Object.entries(maxScoresByDate).map(
      ([date, score]) => ({
        x: new Date(date).getTime(), // Convert date to timestamp
        y: score, // Use the maximum score as y-axis value
      })
    );

    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Max Score",
          data: chartSeriesData,
        },
      ],
    }));
  }, [Attempts, selectedTestId, startDate, endDate]);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const handleTestIdChange = (event) => {
    setSelectedTestId(event.target.value);
  };

  const uniqueTestIds = [
    ...new Set(Attempts.StatAttemptStore.map((row) => row.testId)),
  ];

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
        Статистика по тренажёрам
      </p>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {/* Input elements for date range and test selection */}
        <label htmlFor="startDatePicker" style={{ fontWeight: "bold" }}>
          Начальная дата:
        </label>
        <input
          style={{ width: "500px" }}
          type="date"
          id="startDatePicker"
          value={startDate}
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
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
        <div>
          <label
            htmlFor="testIdSelector"
            style={{ marginTop: "30px", fontWeight: "bold" }}
          >
            Выберите тренажёр:
          </label>
          <select
            id="testIdSelector"
            onChange={handleTestIdChange}
            value={selectedTestId}
            className={classes.ListFilter}
          >
            {uniqueTestIds.map((testId) => (
              <option key={testId} value={testId}>
                {
                  Attempts.StatAttemptStore.find((row) => row.testId === testId)
                    ?.testName
                }
              </option>
            ))}
          </select>
        </div>
        <div className={classes.averageScoreStyle}>
          <div className={classes.textCircle}>
            <div className={classes.circle}>
              <div style={{ color: "#30173d" }}>
                {averageAllPeriod?.averageScore.toFixed(1)}
              </div>
            </div>
            Средний балл по тесту за весь период
          </div>

          <div className={classes.textCircle}>
            <div className={classes.circle}>
              <div style={{ color: "#30173d" }}>
                {average2Weeks?.averageScore.toFixed(1)}
              </div>
            </div>
            Средний балл по тесту за последние 2 недели
          </div>
        </div>
        <div className={classes.chart}>
          {" "}
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <div className="mixed-chart" style={{ backgroundColor: "white" }}>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                width="500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default StatisticByTest;
