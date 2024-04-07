import TestBlok from "../components/TestBlok";
import classes from "./PrimaryTest.module.css";
import { Link } from "react-router-dom";
import { Context } from "../index";
import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
export default function PrimaryTest() {
  const { primaryTest } = useContext(Context);
  const [showTestBlok, setShowTestBlok] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const handleStartTest = () => {
    setShowTestBlok(true);
    setTextVisible(false);
    console.log(showTestBlok);
  };
  return (
    <div>
      <div style={{ backgroundColor: "#30173d" }}>
        <NavBar />
      </div>

      {!showTestBlok && (
        <div className={classes.PrimaryTestBlock}>
          <div className={classes.Test}>
            <div className={classes.Ptext}>
              <div className={classes.TestText}>
                <>
                  <p>
                    Добро пожаловать на увлекательное путешествие в мир вашей
                    собственной памяти!
                  </p>
                  <p>
                    Перед вами стоит небольшой, но важный шаг на пути к
                    улучшению способности запоминания и увеличению объема вашей
                    памяти.
                  </p>{" "}
                  <p>
                    {" "}
                    Память - это удивительное и мощное орудие, которое хранит в
                    себе бесценные воспоминания, знания и опыт вашей жизни.
                    Научиться эффективно использовать её - значит открывать
                    новые возможности и достигать больших успехов в учебе,
                    работе и повседневной жизни.
                  </p>
                  <p>
                    Перед вами предстоит небольшой тест, который поможет вам
                    оценить текущее состояние вашей памяти. Будьте готовы к
                    увлекательным задачам, интересным вопросам.
                  </p>
                  <p>
                    Итак, нажмите на кнопку ниже, чтобы начать тестирование
                    вашей памяти. Приготовьтесь к приключению, которое поможет
                    вам стать лучше и более уверенным в своих способностях!
                  </p>
                  <div className={classes.ReadyBtn}>
                    <button onClick={handleStartTest}>
                      Начать тестирование
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTestBlok && <TestBlok />}
      <div className={classes.part4}>
        <div className={classes.Logo}>LOGO</div>

        <div className={classes.socialIc}>
          <div className={classes.SIC1}></div>
          <div className={classes.SIC2}></div>
          <div className={classes.SIC3}></div>
        </div>
      </div>
    </div>
  );
}
