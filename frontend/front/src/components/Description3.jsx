import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "../pages/Train.module.css";
import { Context } from "../index";
export default function Description3() {
  const { train } = useContext(Context);
  const { id } = useParams();
  const cardInfo = train.TrainStore.find((card) => card.id == id);
  return (
    <>
      {" "}
      <h1>{cardInfo.Name}</h1>
      <div className={classes.manualBlock}>
        {" "}
        <div className={classes.Vnimanie}></div>
        <div className={classes.manual}>
          Для глубокого освоения материала, рекомендуется начать с просмотра
          видеоматериалов. Для лучшего понимания и усвоения техники, важно
          выполнить практические задания, которые представлены в видео, а также
          решать тренировочные задачи, которые разделены на уровни сложности.
        </div>
      </div>
    </>
  );
}
