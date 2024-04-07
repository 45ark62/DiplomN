import React, { useState, useEffect } from "react";
import classes from "./TestBlok2.module.css";

const ArrayQuestionsComponent = ({
  questions,
  onNextQuestion,
  onAnswer,
  isTestFinished,
  onFinishTest,
}) => {
  const [currentArrayQuestionIndex, setCurrentArrayQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(questions[0]?.timeShow);
  const [timerExpired, setTimerExpired] = useState(false);
  const [answer, setAnswer] = useState("");

  const showNextQuestion = () => {
    const nextIndex = currentArrayQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentArrayQuestionIndex(nextIndex);
      setRemainingTime(questions[nextIndex]?.timeShow);
      setTimerExpired(false);
    } else {
      onNextQuestion();
    }
  };

  const handleAnswerCheck = () => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentArrayQuestionIndex];
      const correctAnswer = currentQuestion.answer.toLowerCase();
      const userAnswer = answer.toLowerCase();
      if (userAnswer === correctAnswer) {
        onAnswer(true); // Правильный ответ, передаем true
      } else {
        onAnswer(false); // Неправильный ответ, передаем false
      }
    }
  };

  useEffect(() => {
    if (timerExpired && !isTestFinished) {
      showNextQuestion();
    } else if (isTestFinished) {
    }
  }, [timerExpired, isTestFinished]);

  if (!questions || questions.length === 0) {
    // Если нет массива вопросов, не отображаем компонент
    return null;
  }

  return (
    <div className={classes.arrayBlock}>
      <div className={classes.textQuestion}>
        {questions[currentArrayQuestionIndex]?.question}
      </div>
      <input
        type="text"
        placeholder="Введите ответ"
        onChange={(event) => setAnswer(event.target.value)}
      />
      <button
        onClick={() => {
          showNextQuestion();
          handleAnswerCheck();
        }}
        className={classes.btnContinue}
      >
        Следующий вопрос
      </button>
    </div>
  );
};

export default ArrayQuestionsComponent;
