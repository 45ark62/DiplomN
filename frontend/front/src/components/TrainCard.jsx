import React from "react";

import { Link } from "react-router-dom";
import classes from "../pages/Train.module.css";
import Card from "react-bootstrap/Card";
export default function TrainCard({ mediaPhoto, Name, _id }) {
  return (
    <div>
      <div className={classes.Card}>
        <img src={mediaPhoto}></img>
        <div className={classes.TitleCard}>{Name}</div>
      </div>
    </div>
  );
}
