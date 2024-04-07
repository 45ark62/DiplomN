import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Train.module.css";
import { useEffect, useState } from "react";
import { Context } from "../index";
import TrainCard from "../components/TrainCard";
import NavBar from "../components/NavBar";
import { getCardTrain } from "../API/TrainAPI";
import { observer } from "mobx-react-lite";
import UserBlock from "../components/UserBlock";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const Train = observer(() => {
  const { train } = useContext(Context);
  const { users } = useContext(Context);
  const [show, setShow] = useState(true);
  const getCards = async () => {
    const response = await getCardTrain();
    console.log("cards :", response.data);
    train.setTrain(response.data);
    console.log(users.isLoggedIn);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <div className={classes.part1}>
        {users.loggedIn ? (
          <div className={classes.BlockLeft}>
            <UserBlock />
          </div>
        ) : null}
        <div className={classes.CardsAndMenu}>
          <NavBar />
          <div className={classes.MainBlockCards}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "1000px",
              }}
            >
              <h1 style={{ marginTop: "30px" }}>Инфокурсы</h1>
              <Alert
                show={show}
                variant="success"
                style={{
                  width: "80%",
                  marginLeft: "130px",
                }}
              >
                <Alert.Heading>Добро пожаловать,дорогой друг!</Alert.Heading>
                <p>
                  На данной странице расположены инфокурсы.С их помощью вы
                  можете овладеть мнемоническими техниками,после теории вы
                  можете воспользоваться тренажёром.Во вкладке "Статистика" вы
                  можете узнать о динамике тренировок и заметить регресс или
                  прогресс.Учитесь техникам вместе c нами.Удачи!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setShow(false)}
                    variant="outline-success"
                  >
                    Закрыть
                  </Button>
                </div>
              </Alert>

              <div className={classes.Infocurses}>
                {train.TrainStore.map((oneCard) => (
                  <Link
                    to={`/Card/${oneCard._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <TrainCard
                      mediaPhoto={oneCard.mediaPhoto}
                      Name={oneCard.Name}
                      _id={oneCard._id}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Train;
