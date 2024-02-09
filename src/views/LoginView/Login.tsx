import styles from "./Login.module.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../assets/validation/loginValidationSchema";
import { Link } from "react-router-dom";

// TODO: add submit function
// FIXME:ErrorMessage in react shows only error when error occur, in Vue I used div that show empty string or error message
// in summary in Vue form looks visual better
function Login() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => alert(JSON.stringify(values))}
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
