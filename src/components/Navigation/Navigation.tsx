import React from "react";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";

// TODO: add conditional rendering + add logout action
function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__items}>
        <li>
          <NavLink to="/" data-item="Home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" data-item="Login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" data-item="Register">
            Register
          </NavLink>
        </li>
        <li>
          <span data-item="Logout"> Logout </span>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
