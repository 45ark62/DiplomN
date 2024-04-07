import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "../pages/Train.module.css";
import { Context } from "../index";
import { client, loggedInClient } from "../API/index";
import { getCardTrain } from "../API/TrainAPI";
import NavBar from "../components/NavBar";

export default function Card() {
  const { TrainStore } = useContext(Context);
  const { id } = useParams();

  const [QuestionsArray, setQuestionsArray] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [testName, setTestName] = useState("");
  const [showAllQuestionsCompleted, setShowAllQuestionsCompleted] =
    useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [Time, setTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCard = await client.get(`/api/CardsTrain/${id}`);
        setTestName(getCard.data.Name);

        // Проверяем, что start time не установлен, чтобы избежать перезаписи
        if (!startTime) {
          setStartTime(new Date());
        }

        setQuestionsArray(getCard.data.questionArray);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [id, startTime]);
  useEffect(() => {
    // Рассчитываем время прохождения теста в секундах
    if (startTime && endTime) {
      const timeDifference = ((endTime - startTime) / 1000).toFixed(0);
      console.log("Время прохождения теста:", timeDifference, "секунд");
      setTime(timeDifference);
    }
  }, [startTime, endTime]);
  const handleNextQuestionClick = () => {
    if (QuestionsArray.length > 0) {
      if (questionIndex < QuestionsArray.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setShowInput(false);
        setAnswer("");
      } else {
        if (!endTime) {
          setEndTime(new Date());
        }
        setShowAllQuestionsCompleted(true);
      }
      handleAnswerCheck();
    }
  };

  const handleAnswerCheck = () => {
    if (QuestionsArray.length > 0) {
      const currentQuestion = QuestionsArray[questionIndex];
      const correctAnswer = currentQuestion.answer.toLowerCase();
      const userAnswer = answer.toLowerCase();

      if (userAnswer === correctAnswer) {
        setScore(score + 10);
        console.log("Correct answer! New score:", score + 10);
      } else {
        console.log("Incorrect answer. Score remains:", score);
      }
    }
  };

  const handleAnswerClick = () => {
    setShowInput(true);
    handleAnswerCheck();
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#D6D2E7";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const sendTestResult = async () => {
    try {
      console.log("nameTest", testName);
      const attempt = await loggedInClient.get(
        `/api/trainHistory/lastAttempt/${id}`
      );
      if (attempt.data == null) {
        const response = await loggedInClient.post(`/api/trainHistory/${id}`, {
          score: score,
          attempt: 1,
          time: Time,
          testName: testName,
        });
        // Обработайте ответ по необходимости
        console.log("Результат теста успешно отправлен:", response.data);
      } else {
        const response = await loggedInClient.post(`/api/trainHistory/${id}`, {
          score: score,
          attempt: attempt.data.attempt + 1,
          time: Time,
          testName: testName,
        });
        // Обработайте ответ по необходимости
        console.log("Результат теста успешно отправлен:", response.data);
      }
    } catch (error) {
      console.error("Ошибка при отправке результата теста:", error);
    }
  };
  return (
    <>
      <div className={classes.BlockTest}>
        <div className={classes.Test}>
          <div className={classes.TestInfo}>
            {QuestionsArray.length > 0 && !showAllQuestionsCompleted ? (
              <>
                <h4>Уровень: {QuestionsArray[questionIndex].level}</h4>
                <h3>Баллы: {score}</h3>
              </>
            ) : null}
          </div>
          {showInput ? (
            !showAllQuestionsCompleted ? (
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            ) : (
              <div className={classes.TextTask}>
                {QuestionsArray.length > 0
                  ? QuestionsArray[questionIndex].task
                  : null}
              </div>
            )
          ) : (
            <div className={classes.TextTask}>
              {QuestionsArray.length > 0
                ? QuestionsArray[questionIndex].task
                : null}
            </div>
          )}
          {!showInput && !showAllQuestionsCompleted ? (
            <div className={classes.textQuestion}>
              {QuestionsArray.length > 0
                ? QuestionsArray[questionIndex].textquestion
                : null}
            </div>
          ) : null}
          {showAllQuestionsCompleted ? (
            <div className={classes.TextOverBlock}>
              <div className={classes.TextOver}>
                Все задания пройдены! Не отчаивайтесь, скоро появятся новые
                задания!
              </div>
              <p>Ваш счет: {score} баллов</p>
              <p>Время выполнения:{Time} секунд</p>
              <Link to={`/TrainigTestsPage`}>
                <button className={classes.btn} onClick={sendTestResult}>
                  Перейти к тренажёрам
                </button>
              </Link>
            </div>
          ) : (
            <button
              className={classes.btn}
              onClick={showInput ? handleNextQuestionClick : handleAnswerClick}
            >
              {showInput ? "Следующий вопрос" : "Ответить"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
