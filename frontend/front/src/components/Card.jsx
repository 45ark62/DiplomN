import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "../pages/Train.module.css";
import { Context } from "../index";
import { client, loggedInClient } from "../API/index";
import { getCardTrain } from "../API/TrainAPI";
import Description1 from "./Description1";
import Description2 from "./Description2";
import Description3 from "./Description3";
import TrainTest from "./TrainTest";
import NavBar from "./NavBar";
import axios from "axios";

export default function Card() {
  const { train } = useContext(Context);
  const { users } = useContext(Context);
  const [cardInfo, setCardInfo] = useState(null);
  const [showTrainTest, setShowTrainTest] = useState(false);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function getCardByID() {
      try {
        const getCard = await client.get(`/api/Cards/${id}`);

        setCardInfo(getCard.data);
        console.log(cardInfo.mediaVideo);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    }

    getCardByID();
    // const intervalId = setInterval(() => {
    //  getCardByID();
    // }, 5000);

    // Очищаем интервал при размонтировании компонента
    //return () => clearInterval(intervalId);
  }, [id]);

  const renderDescriptionComponent = () => {
    if (id == "659bf0ec788ee05cd472531d") {
      return <Description1 />;
    } else if (id === "659ce6472609ad501050a399") {
      return <Description2 />;
    } else if (id === "3") {
      return <Description3 />;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={classes.part1}>
        <div className={classes.CardsAndMenu}>
          <NavBar />
          <div className={classes.MainBlockCards}>
            {showTrainTest ? null : (
              <div className={classes.IntoCards}>
                {cardInfo ? (
                  <div className={classes.videoC}>
                    {cardInfo.mediaVideo ? (
                      <video
                        controls
                        onError={(e) => console.error("Video error:", e)}
                      >
                        <source
                          src={
                            process.env.REACT_APP_BASE_URL + cardInfo.mediaVideo
                          }
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <p>No video available.</p>
                    )}
                  </div>
                ) : (
                  <p>Loading video...</p>
                )}
                <div className={classes.description}>
                  {renderDescriptionComponent()}
                </div>
                <button
                  onClick={() => setShowTrainTest(true)}
                  className={classes.ReadyBTN}
                >
                  Перейти к тренажёру
                </button>
              </div>
            )}
            {showTrainTest && <TrainTest />}
          </div>
        </div>
      </div>
    </>
  );
}
