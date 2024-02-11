import styles from "./Login.module.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../assets/validation/loginValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectUser } from "../../stores/authSlice";
import { useEffect } from "react";

// FIXME:ErrorMessage in react shows only error when error occur, in Vue I used div that show empty string or error message
// in summary in Vue form looks visual better
function Login() {
  // any other soluttion make bugs...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const onSubmit = (values: { email: string; password: string }) => {
    dispatch(loginAsync(values));
  };

  // works but is slow compared to Vue
  useEffect(() => {
    if (user.isLogged) navigate("/");
  }, [user.isLogged, navigate]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={loginValidationSchema}
    >
      <Form className={styles.login}>
        <h1 className={styles.login__title}>Sign in</h1>
        <div className={styles.login__item}>
          <label htmlFor="email" className={styles.login__item__label}>
            Email
          </label>
          <Field
            id="email"
            name="email"
            className={styles.login__item__input}
          />
          <ErrorMessage
            name="email"
            className={styles.login__item__error}
            component="div"
          />
        </div>
        <div className={styles.login__item}>
          <label htmlFor="password" className={styles.login__item__label}>
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className={styles.login__item__input}
          />
          <ErrorMessage
            name="password"
            className={styles.login__item__error}
            component="div"
          />
        </div>
        <div className={`${styles.login__item} ${styles["login__item--flex"]}`}>
          <button className={styles.login__item__button}>Log in</button>
          <Link to="/register">Register</Link>
        </div>
      </Form>
    </Formik>
  );
}

export default Login;
