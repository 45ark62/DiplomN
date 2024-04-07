import { Context } from "../index";
import React, { useContext, useEffect, useState, useRef } from "react";
import classes from "./TestBlok.module.css";
import { getSecondaryTest } from "../API/primaryTestAPI";
import { client, loggedInClient } from "../API/index";
import ArrayQuestionsComponent from "./ArrayQuestionsComponent";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function SecondTrainTest() {
  const { secondTest } = useContext(Context);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isTaskVisible, setIsTaskVisible] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [userScore, setUserScore] = useState(1);
  const timerRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [Time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  /*надо считать баллы для массива вопросов и суммировать их
надо еще поправить вёрстку
придумать как хранить баллы для статистики
*/
  useEffect(() => {
    const fetchAndInitTest = async () => {
      try {
        const response = await getSecondaryTest();
        const primaryTestData = response.data;
        console.log(response.data);

        if (primaryTestData.length > 0) {
          secondTest.setSecondTest(primaryTestData);
          setRemainingTime(primaryTestData[0]?.timeShow);
          setStartTime(new Date());
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
  }, [secondTest]);
  useEffect(() => {
    if (isTestFinished && startTime) {
      const endTime = new Date();
      const elapsedMilliseconds = endTime - startTime;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      setTime(elapsedSeconds);
    }
  }, [isTestFinished, startTime]);
  const calculateLevelAndPercentage = (score, total) => {
    const percentage = (score / total) * 100;

    if (percentage >= 70) {
      return {
        level: "высокий",
        percentage,
        recommend:
          "Вы молодец!На этом вопросы тестирования закончились,не отчаивайтесь,мы скоро добавим новые задания и инфокурсы!",
      };
    } else if (percentage >= 40) {
      return {
        level: "средний",
        percentage,
        recommend:
          "Вопросы закончились,не расстаивайтесь,скоро мы выложим новые задания и инфокурсы!",
      };
    } else {
      return {
        level: "низкий",
        percentage,
        recommend:
          "Не расстраивайтесь.Тренируйтесь и у вас всё получится,а с нашей стороны ждите еще больше уровней и крутых инфокурсов!",
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
      const attempt = await loggedInClient.get(
        `/api/trainHistory/lastAttempt/65c6174641852a0af63dc7aa`
      );
      if (attempt.data == null) {
        const response = await loggedInClient.post(
          `/api/trainHistory/65c6174641852a0af63dc7aa`,
          {
            score: userScore,
            attempt: 1,
            time: Time,
            testName: "Промежуточное тестирование",
          }
        );
        // Обработайте ответ по необходимости
        console.log("Результат теста успешно отправлен:", response.data);
      } else {
        const response = await loggedInClient.post(
          `/api/trainHistory/65c6174641852a0af63dc7aa`,
          {
            score: userScore,
            attempt: attempt.data.attempt + 1,
            time: Time,
            testName: "Промежуточное тестирование",
          }
        );
        setStartTime(null);
        // Обработайте ответ по необходимости
        console.log("Результат теста успешно отправлен:", response.data);
      }
    } catch (error) {
      console.error("Ошибка при отправке результата теста:", error);
    }
  };
  const getNextQuestion = () => {
    const nextQuestionIndex = questionIndex + 1;

    if (nextQuestionIndex < secondTest.secondTest.length) {
      const nextQuestion = secondTest.secondTest[nextQuestionIndex];

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
    if (userInput === secondTest.secondTest[questionIndex]?.answer) {
      setUserScore((prevScore) => prevScore + 1);
      console.log(userScore);
    } else {
      console.log(userScore);
    }

    if (!isTestFinished) {
      getNextQuestion();
    } else {
      setIsTaskVisible(false);
      setIsTestCompleted(true);
    }
  };

  return (
    <>
      <NavBar />
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
                  ? secondTest.secondTest[questionIndex]?.textTask
                  : null}
              </div>
              {isTaskVisible &&
                secondTest.secondTest[questionIndex]?.mediaType === "audio" && (
                  <audio
                    controls
                    src={
                      process.env.REACT_APP_BASE_URL +
                      secondTest.secondTest[questionIndex]?.mediaTask
                    }
                  ></audio>
                )}
              {isTaskVisible &&
                secondTest.secondTest[questionIndex]?.mediaType === "photo" && (
                  <img
                    src={
                      process.env.REACT_APP_BASE_URL +
                      secondTest.secondTest[questionIndex]?.mediaTask
                    }
                    alt="Фото вопроса"
                    style={{ height: "400px", width: "550px" }}
                  />
                )}
              <div className={classes.textZadanie}>
                {isTaskVisible
                  ? secondTest.secondTest[questionIndex]?.textZadanie
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
                      30
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
                    {calculateLevelAndPercentage(userScore, 30).level} уровень
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#371947",
                      textAlign: "center",
                    }}
                  >
                    {calculateLevelAndPercentage(userScore, 30).recommend}
                  </p>
                  <p>{Time}</p>
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
                    {secondTest.secondTest[questionIndex].arrayQuestions
                      .length == 0 && (
                      <>
                        <input
                          type="text"
                          placeholder="Введите ответ"
                          value={userInput}
                          onChange={(event) => setUserInput(event.target.value)}
                        />{" "}
                        {console.log("Кнопка отображается")}{" "}
                        <button
                          onClick={checkAnswer}
                          className={classes.btnContinue}
                        >
                          Следующее задание
                        </button>
                      </>
                    )}
                    {secondTest.secondTest[questionIndex]?.arrayQuestions && (
                      <ArrayQuestionsComponent
                        questions={
                          secondTest.secondTest[questionIndex]?.arrayQuestions
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
    </>
  );
}
