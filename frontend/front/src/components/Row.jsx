import React, { useContext, useState, useEffect } from "react";
import { client, loggedInClient } from "../API/index";
import { Link } from "react-router-dom";
import classes from "../pages/Train.module.css";

export default function Row({ testName, rowNumber, id, attempt, score, date }) {
  // Преобразовываем дату
  const dateTime = new Date(date);
  const formattedDate = dateTime.toLocaleDateString();
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <tr>
      <td>{rowNumber}</td>
      <td>{testName}</td>

      <td>{score}</td>

      <td>{attempt}</td>
      <td>{formattedDate}</td>
      <td>{formattedTime}</td>
    </tr>
  );
}
