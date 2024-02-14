/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./NewIncome.module.scss";
import { incomeExpenseValidationSchema } from "../../assets/validation/incomeExpenseValidationSchema";
import { IncomeExpense } from "../../interfaces/incomeExpense";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewIncomeAsync,
  getIncomeSourcesAsync,
} from "../../stores/incomeSlice";
import { useNavigate } from "react-router-dom";

function NewIncome() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.id);
  const incomeSources = useSelector((state: any) => state.income.incomeSources);

  useEffect(() => {
    dispatch(getIncomeSourcesAsync(token));
  }, [dispatch, token]);

  const onSubmit = (values: IncomeExpense) => {
    values.userId = userId;
    dispatch(createNewIncomeAsync({ incomeData: values, token: token })).then(
      () => navigate("/")
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: "",
        amount: null,
        date: new Date().toISOString().substr(0, 10),
        sourceId: incomeSources[0].id,
      }}
      onSubmit={onSubmit}
      validationSchema={incomeExpenseValidationSchema}
    >
      <Form className={styles.income}>
        <h1 className={styles.income__title}>New Income</h1>
        <div className={styles.income__item}>
          <label htmlFor="name" className={styles.income__item__label}>
            Name
          </label>
          <Field id="name" name="name" className={styles.income__item__input} />
          <ErrorMessage
            name="name"
            className={styles.income__item__error}
            component="div"
          />
        </div>
        <div className={styles.income__item}>
          <label htmlFor="amount" className={styles.income__item__label}>
            Amount
          </label>
          <Field
            id="amount"
            name="amount"
            type="number"
            step={0.01}
            min={1}
            className={styles.income__item__input}
          />
          <ErrorMessage
            name="amount"
            className={styles.income__item__error}
            component="div"
          />
        </div>
        <div className={styles.income__item}>
          <label htmlFor="date" className={styles.income__item__label}>
            Date
          </label>
          <Field
            id="date"
            name="date"
            type="date"
            className={styles.income__item__input}
          />
          <ErrorMessage
            name="date"
            className={styles.income__item__error}
            component="div"
          />
        </div>
        <div className={styles.income__item}>
          <label htmlFor="sourceId" className={styles.income__item__label}>
            Date
          </label>
          <Field
            id="sourceId"
            name="sourceId"
            as="select"
            className={styles.income__item__input}
          >
            {incomeSources.map((source: any, key: any) => (
              <option key={key} value={source.id}>
                {source.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="sourceId"
            className={styles.income__item__error}
            component="div"
          />
        </div>
        <div className={styles["income__item--flex"]}>
          <button className={styles.income__item__button} type="submit">
            Add
          </button>
          <button className={styles.income__item__button} type="reset">
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NewIncome;
