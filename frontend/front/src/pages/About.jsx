import classes from "./Home.module.css";
import NavBar from "../components/NavBar";
import { Link, Route } from "react-router-dom";
export default function About() {
  return (
    <div>
      <div className={classes.part1}>
        <NavBar />
        <div className={classes.TextContainerAbout}>
          <div className={classes.TitleAbout}>О ПРОЕКТЕ</div>
          <h1>"Веб тренажёр памяти с использованием мнемонических техник"</h1>

          <div className={classes.AboutC}>
            {" "}
            <div className={classes.TextAbout}>
              <h3 className={classes.TextAbout}>Реализовано:</h3>
              <ul className={classes.TextAbout}>
                <li className={classes.TextAbout}>
                  Основной интерфес приложения
                </li>
                <li className={classes.TextAbout}>
                  Два инфокурса(Разбор техник запоминания слов и цифр)
                </li>
                <li className={classes.TextAbout}>
                  Два тренажёра(Развитие техник запоминания слов и цифр) в
                  каждом по 10 уровней сложности
                </li>
                <li>Входное тестирование памяти с рекомендациями </li>
                <li>Промежуточное тестирование памяти </li>
                <li>Статистика прохождения тренажёров</li>
              </ul>
            </div>
            <div className={classes.TextAbout}>
              <h3 className={classes.TextAbout}>Запланировано:</h3>
              <ul>
                <li>Создание мобильного приложения </li>
                <li>Добавление новых инфокурсов</li>
                <li>Увеличить количество уровней</li>
                <></>
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.part4}>
          <div className={classes.Logo}>LOGO</div>

          <div className={classes.socialIc}>
            <a href="https://vk.com/45ark97">
              {" "}
              <div className={classes.SIC1}></div>
            </a>
            <a href="https://t.me/BlackBerry999">
              <div className={classes.SIC2}></div>
            </a>
            <a href="45ark97@gmail.com">
              <div className={classes.SIC3}></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
