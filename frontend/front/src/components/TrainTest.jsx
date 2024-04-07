import React, { useContext, useState, useEffect } from "react";
import classes from "../pages/Train.module.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../index";
import { getCardTrain } from "../API/TrainAPI";
import { client, loggedInClient } from "../API/index";
export default function TrainTest() {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCard = await client.get(`/api/Cards/${id}`);
        setTestName(getCard.data.Name);
        console.log(testName);
        setQuestionsArray(getCard.data.questionArray);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    // Выполнять fetchData каждую секунду
    const intervalId = setInterval(fetchData, 1000);

    // Очищать интервал при размонтировании компонента или изменении id
    return () => clearInterval(intervalId);
  }, [id]); // Зависимость от id

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

  const handleNextQuestionClick = () => {
    if (QuestionsArray.length > 0) {
      if (questionIndex < QuestionsArray.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setShowInput(false);
        setAnswer("");
      } else {
        setShowAllQuestionsCompleted(true);
        sendTestResult();
      }
      handleAnswerCheck();
    }
  };
  const sendTestResult = async () => {
    try {
      console.log("nameTest", testName);
      const attempt = await loggedInClient.get(
        `/api/userHistory/lastAttempt/${id}`
      );
      if (attempt.data == null) {
        const response = await loggedInClient.post(`/api/userHistory/${id}`, {
          score: score,
          attempt: 1,
          testName: testName,
        });
        // Обработайте ответ по необходимости
        console.log("Результат теста успешно отправлен:", response.data);
      } else {
        const response = await loggedInClient.post(`/api/userHistory/${id}`, {
          score: score,
          attempt: attempt.data.attempt + 1,
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
                required
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
              <Link to={`/Train`}>
                <button className={classes.btn}>Перейти к тренажёрам</button>
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
