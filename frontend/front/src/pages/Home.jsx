import { Link, Route } from "react-router-dom";
import classes from "./Home.module.css";

import React, { useContext, useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import { Context } from "../index";
import { getPtestRezult } from "../API/primaryTestAPI";
export default function Home() {
  const { users } = useContext(Context);
  const [Ptest, setPtest] = useState("");
  const getCards = async () => {
    try {
      const response = await getPtestRezult();
      setPtest(response.data);
      console.log("Ptest", Ptest);
    } catch (error) {
      console.error("Error fetching Ptest:", error);
    }
  };

  useEffect(() => {
    // Выполняем getCards сразу при монтировании компонента
    getCards();

    // Затем устанавливаем интервал для выполнения getCards каждую секунду
    const intervalId = setInterval(() => {
      getCards();
    }, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <div className={classes.part1}>
        <NavBar />
        <div className={classes.TextContainer}>
          <div className={classes.Title}>
            ИГРЫ ДЛЯ УЛУЧШЕНИЯ ПАМЯТИ ЧЕРЕЗ МАГИЮ МНЕМОНИКИ
          </div>
          <div className={classes.Text}>
            Добро пожаловать на MemoMastery — веб-платформу, которая превращает
            обучение в увлекательное путешествие к совершенствованию памяти! Мы
            рады приветствовать вас на нашем виртуальном пространстве, где игры
            не только развлекают, но и помогают улучшить вашу способность
            запоминания.
          </div>
          <div className={classes.toggle}></div>
        </div>
      </div>
      <div className={classes.part2}>
        <div className={classes.Blok2}>
          <div className={classes.titleBlok2}>Актуальность</div>
          <div className={classes.textBlok2}>
            Насыщенная информацией современная жизнь требует от нас постоянно
            держать в голове множество данных — от важных дат и фактов до
            творческих идей. Наша платформа основана на мнемонической технике —
            древней стратегии улучшения памяти через ассоциации и визуальные
            образы. Основными причинами ухудшения памяти служат:
          </div>
        </div>
        <div className={classes.reasons}>
          <div className={classes.reason}>
            <div className={classes.IC1}></div>
            <div className={classes.reasonTitle}>Информационная перегрузка</div>
            <div className={classes.reasonText}>
              Современный мир — информационно насыщенный. Индивиды ежедневно
              сталкиваются с огромным объемом данных. Это может затруднять
              сохранение важной информации в памяти из-за перегрузки. Отсеивание
              сущностей и выбор значимого — нагрузка на память, воздействующая
              на ее эффективность.
            </div>
          </div>
          <div className={classes.reason}>
            <div className={classes.IC2}></div>
            <div className={classes.reasonTitle}>
              Спад читательской активности
            </div>
            <div className={classes.reasonText}>
              <ul>
                <li>
                  Технологический прогресс уменьшает интерес к чтению из-за
                  доступности разнообразных развлечений, таких как соцсети и
                  видеоигры.
                </li>
                <li>
                  Ограниченное свободное время в современной жизни уменьшает
                  возможность для чтения из-за работы и обязательств.
                </li>
                <li>
                  Изменение культурных предпочтений среди поколений приводит к
                  уменьшению интереса к книгам в пользу визуальных и звуковых
                  форматов развлечений.
                </li>
              </ul>
            </div>
          </div>
          <div className={classes.reason}>
            <div className={classes.IC3}></div>
            <div className={classes.reasonTitle}>
              Массовое заболевание COVID-19
            </div>
            <div className={classes.reasonText}>
              Данное заболевание влияет на когнитивные способности: «Covid-19
              поражает клетки нервной системы – вирус способен использовать
              механизмы нейрональных клеток для репликации, что в свою очередь
              может способствовать гибели близлежащих клеток, мозга, что также
              провоцирует изменение сознания и возникновению когнитивных
              нарушений»
            </div>
          </div>
        </div>
      </div>
      <div className={classes.part3}>
        <div className={classes.title3}>Общие сведения о мнемотехнике</div>
        <div className={classes.Mnemo}>
          Мнемоте́хника — совокупность специальных приёмов мнемоники и способов,
          облегчающих запоминание нужной информации и увеличивающих объём памяти
          путём образования ассоциаций (связей): замена абстрактных объектов и
          фактов на понятия и представления, имеющие визуальное, аудиальное или
          кинестетическое представление, связывание объектов с уже имеющейся в
          памяти информацией, различные модификации для упрощения запоминания.
        </div>
        <div className={classes.TecContainer}>
          <div className={classes.IMG}></div>
          <div className={classes.TecBlock}>
            <a id="part3">
              <div className={classes.tecTitle}> Техники:</div>
            </a>
            <div className={classes.tecItems}>
              <ul>
                <li>
                  Метод ассоциаций:
                  <p>
                    Состоит в создании связей между новой информацией и уже
                    известными образами, словами или понятиями.
                  </p>
                </li>
                <li>
                  Акростихи и анаграммы:
                  <p>
                    Использование первых букв слов для создания аббревиатур или
                    изменение порядка букв в словах для формирования новых слов.
                  </p>
                </li>
                <li>
                  Изображения и образы:
                  <p>
                    Создание воображаемых картинок, которые связаны с понятиями,
                    которые необходимо запомнить.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.PractBlock}>
          <div className={classes.pracTitle}> Практические применения:</div>
          <div className={classes.pracItems}>
            <ul>
              <li>
                Обучение:
                <p>
                  Ученики могут использовать мнемонику для запоминания формул,
                  дат, фактов и другой учебной информации.
                </p>
              </li>
              <li>
                Работа:
                <p>
                  Применение мнемоники может помочь в запоминании иерархии
                  задач, важных данных о клиентах и другой профессиональной
                  информации.
                </p>
              </li>
              <li>
                Изучение языков:
                <p>
                  Запоминание новых слов и грамматических правил становится
                  более эффективным.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.firstTestBtn}>
          {users.loggedIn ? (
            Ptest.length != 0 ? null : ( // Скрываем кнопку, так как Ptest не null
              <Link to="/PrimaryTest">
                <button>Начать тестирование</button>
              </Link>
            )
          ) : (
            <Link to="/Login">
              <button>Начать тестирование</button>
            </Link>
          )}
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
  );
}
