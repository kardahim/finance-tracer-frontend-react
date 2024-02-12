// Original style by G. Rohit
// https://codepen.io/grohit/pen/jObGzdG

import { useDispatch, useSelector } from "react-redux";
import styles from "./Navigation.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../stores/authSlice";

function Navigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__items}>
        <li>
          <NavLink to="/" data-item="Home">
            Home
          </NavLink>
        </li>
        {!user.isLogged ? (
          <>
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
          </>
        ) : null}
        {user.isLogged ? (
          <li>
            <span data-item="Logout" onClick={onSubmit}>
              Logout
            </span>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navigation;
