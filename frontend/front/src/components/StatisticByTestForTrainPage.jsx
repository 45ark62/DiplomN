import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getStatAttemptsForTrainPage } from "../API/StatAPI";
import classes from "../pages/Statistics.module.css";
import { client, loggedInClient } from "../API";
const StatisticByTestForTrainPage = observer(() => {
  const { AttemptsForTrain } = useContext(Context);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [averageAllPeriod, setAverageAllPeriod] = useState(null);
  const [average2Weeks, setAverage2Weeks] = useState(null);
  const [bestAttempt, setBestAttempt] = useState(null);
  const [lastAttempt, setlastAttempt] = useState(null);
  const [Ptest, setPtest] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const maxScore = 30;
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
        name: "Балл",
        data: [], // Empty array for the data, it will be filled dynamically
      },
    ],
  });
  const [chartDataSeconds, setChartDataSeconds] = useState({
    options: {
      chart: {
        id: "basic-bar-seconds",
      },
      xaxis: {
        type: "datetime",
      },
      colors: ["#4B0082", "#800080"],
    },
    series: [
      {
        name: "Балл",
        data: [],
      },
    ],
  });
  const [combinedChartData, setCombinedChartData] = useState({
    options: {
      chart: {
        id: "combined-chart",
      },
      xaxis: {
        type: "datetime",
      },
      colors: ["#4B0082", "#00818E", "#00818E"], // Add a new color for the combined chart
    },
    series: [
      {
        name: "Балл",
        data: [],
      },
      {
        name: "Время(сек)",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatAttemptsForTrainPage();
        AttemptsForTrain.setStat(response.data);
        const uniqueTestIds = [
          ...new Set(
            AttemptsForTrain.StatAttemptStoreForTrainPage.map(
              (row) => row.testId
            )
          ),
        ];
        setSelectedTestId(uniqueTestIds[0]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, [AttemptsForTrain]);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const getAverageAll = await loggedInClient.get(
          `/api/trainHistory/average/${selectedTestId}`
        );
        setAverageAllPeriod(getAverageAll.data);
        const getAverage2Weeks = await loggedInClient.get(
          `/api/trainHistory/averageLastTwoWeeks/${selectedTestId}`
        );
        setAverage2Weeks(getAverage2Weeks.data);
        const getBestAttempt = await loggedInClient.get(
          `/api/trainHistory/bestAttempt/${selectedTestId}`
        );
        setBestAttempt(getBestAttempt.data);
        const getlastAttempt = await loggedInClient.get(
          `/api/trainHistory/lastAttempt/${selectedTestId}`
        );
        setlastAttempt(getlastAttempt.data);
        const getPtest = await loggedInClient.get(`/api/Ptest`);
        setPtest(getPtest.data[0]);
        console.log("ptest", Ptest);
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
    const filteredData = AttemptsForTrain.StatAttemptStoreForTrainPage.filter(
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
  }, [AttemptsForTrain, selectedTestId, startDate, endDate]);
  /*Second chart */
  useEffect(() => {
    const filteredData = AttemptsForTrain.StatAttemptStoreForTrainPage.filter(
      (row) =>
        row.testId === selectedTestId &&
        (!startDate || row.date >= startDate) &&
        (!endDate || row.date <= endDate)
    );

    // Создаем объект для отслеживания минимального времени
    const improvementsByDate = {};

    filteredData.forEach((row) => {
      const date = row.date;
      const time = row.time;

      if (!improvementsByDate[date] || time < improvementsByDate[date]) {
        // Если для данной даты нет записи или текущее время меньше, обновляем
        improvementsByDate[date] = time;
      }
    });

    // Преобразуем данные для отображения на графике
    const chartSeriesData = Object.entries(improvementsByDate).map(
      ([date, time]) => ({
        x: new Date(date).getTime(),
        y: time, // Используем только время
      })
    );

    setChartDataSeconds((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Время(сек)",
          data: chartSeriesData,
        },
      ],
    }));
  }, [AttemptsForTrain, selectedTestId, startDate, endDate]);
  /* */
  /*Третий график */
  useEffect(() => {
    const combinedChartData = {
      maxScoreData: chartData.series[0].data,
      improvementData: chartDataSeconds.series[0].data.map((point) => ({
        x: point.x, // Using the same x values for both datasets
        y: point.y, // y values from the second chart
      })),
    };

    setCombinedChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Баллы",
          data: combinedChartData.maxScoreData,
        },
        {
          name: "Время(сек)",
          data: combinedChartData.improvementData,
        },
      ],
    }));
  }, [chartData.series, chartDataSeconds.series]);

  /* */
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
    ...new Set(
      AttemptsForTrain.StatAttemptStoreForTrainPage.map((row) => row.testId)
    ),
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
          className={classes.startDate}
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
          className={classes.startDate}
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
                  AttemptsForTrain.StatAttemptStoreForTrainPage.find(
                    (row) => row.testId === testId
                  )?.testName
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
                {bestAttempt?.score}/{bestAttempt?.time}
              </div>
            </div>
            Лучшая попытка(балл/время(сек))
          </div>
          <div className={classes.textCircle}>
            <div className={classes.circle}>
              <div style={{ color: "#30173d" }}>
                {lastAttempt?.score}/{lastAttempt?.time}
              </div>
            </div>
            Последняя попытка(балл/время(сек))
          </div>
        </div>
        {lastAttempt?.testName == "Промежуточное тестирование" && (
          <div
            id="CompareTests"
            style={{
              margin: "auto",
              height: "200px",
              width: "80%",
              backgroundColor: "white",
              display: "flex",
            }}
          >
            <div
              style={{
                height: "200px",
                width: "50%",
                borderRight: "4mm solid #D6D2E7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                color: "#30173d",
                fontWeight: "700",
              }}
            >
              Первичный тест
              <br /> {Ptest?.score}({Ptest?.scoreInPercent} %)
            </div>
            <div
              style={{
                height: "200px",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                color: "#30173d",
                fontWeight: "700",
              }}
            >
              {" "}
              Промежуточный тест <br />
              Баллы: {lastAttempt?.score} (
              {((lastAttempt?.score / maxScore) * 100).toFixed(1)}%) <br />{" "}
              Время(сек):{lastAttempt?.time}
            </div>
          </div>
        )}
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
              График динамики баллов от попыток
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                width="500"
              />
            </div>
            <div
              className="mixed-chart"
              style={{ backgroundColor: "white", marginLeft: "20px" }}
            >
              График динамики времени от попыток
              <Chart
                options={chartDataSeconds.options}
                series={chartDataSeconds.series}
                type="area"
                width="500"
              />
            </div>
            <div
              className="mixed-chart"
              style={{ backgroundColor: "white", marginTop: "100px" }}
            >
              График динамики баллов и времени от попыток
              <Chart
                options={combinedChartData.options}
                series={combinedChartData.series}
                type="area"
                width="1000"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default StatisticByTestForTrainPage;
