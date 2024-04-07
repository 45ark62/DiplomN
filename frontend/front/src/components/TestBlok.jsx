import { Context } from "../index";
import React, { useContext, useEffect, useState, useRef } from "react";
import classes from "./TestBlok.module.css";
import { getPrimaryTest } from "../API/primaryTestAPI";
import { client, loggedInClient } from "../API/index";
import ArrayQuestionsComponent from "./ArrayQuestionsComponent";
import { Link } from "react-router-dom";

export default function TestBlok() {
  const { primaryTest } = useContext(Context);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isTaskVisible, setIsTaskVisible] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const timerRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [answer, setAnswer] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  /*надо считать баллы для массива вопросов и суммировать их
надо еще поправить вёрстку
придумать как хранить баллы для статистики
*/
  useEffect(() => {
    const fetchAndInitTest = async () => {
      try {
        const response = await getPrimaryTest();
        const primaryTestData = response.data;

        if (primaryTestData.length > 0) {
          primaryTest.setPrimaryTest(primaryTestData);
          setRemainingTime(primaryTestData[0]?.timeShow);
          startTimer();
        } else {
          console.error("Empty primary test data");
        }
      } catch (error) {
        console.error("Error fetching primary test:", error);
      }
    };

    fetchAndInitTest();

    return () => {
      clearInterval(timerRef.current);
    };
  }, [primaryTest]);
  const calculateLevelAndPercentage = (score, total) => {
    const percentage = (score / total) * 100;

    if (percentage >= 70) {
      return {
        level: "высокий",
        percentage,
        recommend:
          "У вас очень хорошие начальные данные уровня памяти.Если вы еще не знакомы с мнемоническими техниками для запоминания большого количества слов и цифр,то вы можете с ними ознакомиться в вкладке Инфокурсы,а затем перейти к тренажёрам",
      };
    } else if (percentage >= 40) {
      return {
        level: "средний",
        percentage,
        recommend:
          "У вас средние начальные данные уровня памяти.Рекомендуем начать с ознакомления с мнемоническими техниками в вкладке Инфокурсы.Чтобы тренировать полученные знания,перейдите в вкладку тренажёры.",
      };
    } else {
      return {
        level: "низкий",
        percentage,
        recommend:
          "У вас низкие начальные данные уровня памяти.Рекомендуем начать с ознакомления с мнемоническими техниками в вкладке Инфокурсы.Чтобы тренировать полученные знания,перейдите в вкладку тренажёры.",
      };
    }
  };
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setTimerExpired(true);
          setIsTaskVisible(false);
          return 0;
        }
      });
    }, 100); //1000
  };
  const sendTestResult = async () => {
    try {
      const response = await loggedInClient.post(`/api/Ptest`, {
        attempt: 1,
        score: userScore,
        testName: "Входное тестирование",
        scoreInPercent: calculateLevelAndPercentage(
          userScore,
          28
        ).percentage.toFixed(0),
      });
      // Обработайте ответ по необходимости
      console.log("Результат теста успешно отправлен:", response.data);
    } catch (error) {
      console.error("Ошибка при отправке результата теста:", error);
    }
  };
  const getNextQuestion = () => {
    const nextQuestionIndex = questionIndex + 1;

    if (nextQuestionIndex < primaryTest.primaryTest.length) {
      const nextQuestion = primaryTest.primaryTest[nextQuestionIndex];

      setIsTaskVisible(false);
      if (nextQuestion?.arrayQuestions) {
        setQuestionIndex(nextQuestionIndex);
        setRemainingTime(nextQuestion.timeShow);
        setTimerExpired(false);
        setIsTaskVisible(true);
      } else {
        setQuestionIndex(nextQuestionIndex);
        setRemainingTime(nextQuestion.timeShow);
        setTimerExpired(false);
        setIsTaskVisible(true);
        // setShowContinueButton(true); // Показываем кнопку "Продолжить"
      }
    } else {
      setIsTestFinished(true);
      setShowResult(true);
    }
  };
  const checkAnswer = () => {
    const userEnteredAnswer = userInput.toLowerCase();
    const correctAnswer =
      primaryTest.primaryTest[questionIndex]?.answer.toLowerCase();

    if (userEnteredAnswer === correctAnswer) {
      console.log(userEnteredAnswer, "u", correctAnswer);
      setUserScore((prevScore) => prevScore + 1);
      console.log("UScore", userScore);
    } else {
    }

    if (!isTestFinished) {
      getNextQuestion();
    } else {
      setIsTaskVisible(false);
      setIsTestCompleted(true);
    }
  };

  return (
    <div className={classes.PrimaryTestBlock}>
      <div className={classes.Test}>
        <div className={classes.MainBlock}>
          <div className={classes.upBlock}>
            {isTaskVisible && (
              <div className={classes.timer}>
                Оставшееся время: {remainingTime} сек
              </div>
            )}
          </div>

          <div key={questionIndex} className={classes.bottomBlock}>
            <div
              className={classes.textZad}
              style={{ padding: "auto", fontSize: "22px" }}
            >
              {isTaskVisible
                ? primaryTest.primaryTest[questionIndex]?.textTask
                : null}
            </div>
            {isTaskVisible &&
              primaryTest.primaryTest[questionIndex]?.mediaType === "audio" && (
                <audio
                  controls
                  src={
                    process.env.REACT_APP_BASE_URL +
                    primaryTest.primaryTest[questionIndex]?.mediaTask
                  }
                ></audio>
              )}
            {isTaskVisible &&
              primaryTest.primaryTest[questionIndex]?.mediaType === "photo" && (
                <img
                  src={
                    process.env.REACT_APP_BASE_URL +
                    primaryTest.primaryTest[questionIndex]?.mediaTask
                  }
                  alt="Фото вопроса"
                  style={{ height: "400px", width: "550px" }}
                />
              )}
            <div className={classes.textZadanie}>
              {isTaskVisible
                ? primaryTest.primaryTest[questionIndex]?.textZadanie
                : null}
            </div>
            {showResult ? (
              <div style={{}}>
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#371947",
                    textAlign: "center",
                  }}
                >
                  Ваш балл: {userScore} ({" "}
                  {calculateLevelAndPercentage(
                    userScore,
                    27
                  ).percentage.toFixed(0)}
                  %)
                </div>

                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#371947",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {calculateLevelAndPercentage(userScore, 27).level} уровень
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#371947",
                    textAlign: "center",
                  }}
                >
                  {calculateLevelAndPercentage(userScore, 27).recommend}
                </p>

                <Link to={"/"}>
                  <button
                    onClick={sendTestResult}
                    className={classes.btnContinue}
                    style={{
                      margin: " auto",
                      fontSize: "16px",
                    }}
                  >
                    завершить тест
                  </button>
                </Link>
              </div>
            ) : (
              timerExpired && (
                <div className={classes.InputUserBlock}>
                  {primaryTest.primaryTest[questionIndex].arrayQuestions
                    .length == 0 && (
                    <>
                      <input 
                        type="text"
                        placeholder="Введите ответ"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                      />{" "}
                      {console.log(userInput)}
                      <button
                        onClick={checkAnswer}
                        className={classes.btnContinue}
                      >
                        Следующее задание
                      </button>
                    </>
                  )}
                  {primaryTest.primaryTest[questionIndex]?.arrayQuestions && (
                    <ArrayQuestionsComponent
                      questions={
                        primaryTest.primaryTest[questionIndex]?.arrayQuestions
                      }
                      onNextQuestion={getNextQuestion}
                      onAnswer={(isCorrect) => {
                        if (isCorrect) {
                          setUserScore((prevScore) => prevScore + 1);
                          console.log(userScore);
                        } else {
                          console.log(userScore);
                        }
                      }}
                      isTestFinished={isTestFinished}
                      onFinishTest={isTestCompleted} // Передаем onFinishTest в ArrayQuestionsComponent
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
