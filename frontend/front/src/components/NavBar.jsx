import { Link, useNavigate } from "react-router-dom";
import classes from "../pages/Home.module.css";
import { Context } from "../index";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import About from "../pages/About";

const NavBar = observer(() => {
  const { users } = useContext(Context);
  const navigate = useNavigate();
  function setLoggin() {
    users.setLoggedIn(false);
    localStorage.clear();
  }
  return (
    <>
      <div className={classes.background}>
        <div className={classes.Logo}>LOGO</div>
        <div className={classes.menuContainer}>
          <div className={classes.menu}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className={classes.menuItem}>Главная</div>
            </Link>

            <Link to="/Train" style={{ textDecoration: "none" }}>
              <div className={classes.menuItem}>Инфокурсы</div>
            </Link>
            <Link to="/TrainigTestsPage" style={{ textDecoration: "none" }}>
              <div className={classes.menuItem}>Тренажёры</div>
            </Link>
            <Link to="/About" style={{ textDecoration: "none" }}>
              <div className={classes.menuItem}>О сайте</div>
            </Link>
          </div>
        </div>
        <div className={classes.logInBtn}>
          {users.loggedIn ? (
            <button onClick={() => setLoggin()}>Выйти</button>
          ) : (
            <button onClick={() => navigate("/Login")}>Авторизоваться </button>
          )}
        </div>
      </div>
    </>
  );
});
export default NavBar;
