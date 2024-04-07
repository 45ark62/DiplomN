import { Link, useNavigate } from "react-router-dom";
import classes from "./UserBlock.module.css";
import { Context } from "../index";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import About from "../pages/About";
import Image from "react-bootstrap/Image";

const UserBlockForTrainPage = observer(() => {
  const { users } = useContext(Context);
  const navigate = useNavigate();
  console.log("name", users.username);
  return (
    <>
      
        {" "}
        <div className={classes.AvatarUser}>
          <Image
            src="https://gas-kvas.com/uploads/posts/2023-02/1675254002_gas-kvas-com-p-stich-art-risunok-42.jpg"
            roundedCircle
          />
        </div>
      
      <div className={classes.username}>{users._user.username}</div>
      <div className={classes.username}>{users._user.email}</div>
      <Link to={"/trainStatistic"} style={{ width: "100%" }}>
        <button className={classes.BtnStat}>Статистика</button>
      </Link>
    </>
  );
});
export default UserBlockForTrainPage;
