import styles from "./Register.module.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { registerValidationSchema } from "../../assets/validation/registerValidationSchema";

// TODO: add submit function
// FIXME:ErrorMessage in react shows only error when error occur, in Vue I used div that show empty string or error message
// in summary in Vue form looks visual better
function Register() {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", password: "", email: "" }}
      onSubmit={(values) => alert(JSON.stringify(values))}
      validationSchema={registerValidationSchema}
    >
      <Form className={styles.register}>
        <h1 className={styles.register__title}>Sign up</h1>
        <div className={styles.register__item}>
          <label htmlFor="firstName" className={styles.register__item__label}>
            Firstname
          </label>
          <Field
            id="firstName"
            name="firstName"
            className={styles.register__item__input}
          />
          <ErrorMessage
            name="firstName"
            className={styles.register__item__error}
            component="div"
          />
        </div>
        <div className={styles.register__item}>
          <label htmlFor="lastName" className={styles.register__item__label}>
            Lastname
          </label>
          <Field
            id="lastName"
            name="lastName"
            className={styles.register__item__input}
          />
          <ErrorMessage
            name="lastName"
            className={styles.register__item__error}
            component="div"
          />
        </div>
        <div className={styles.register__item}>
          <label htmlFor="email" className={styles.register__item__label}>
            Email
          </label>
          <Field
            id="email"
            name="email"
            className={styles.register__item__input}
          />
          <ErrorMessage
            name="email"
            className={styles.register__item__error}
            component="div"
          />
        </div>
        <div className={styles.register__item}>
          <label htmlFor="password" className={styles.register__item__label}>
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className={styles.register__item__input}
          />
          <ErrorMessage
            name="password"
            className={styles.register__item__error}
            component="div"
          />
        </div>
        <div
          className={`${styles.register__item} ${styles["register__item--flex"]}`}
        >
          <button className={styles.register__item__button}>Register</button>
          <Link to="/login">Login</Link>
        </div>
      </Form>
    </Formik>
  );
}

export default Register;