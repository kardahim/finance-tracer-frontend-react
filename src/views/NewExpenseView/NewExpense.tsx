/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./NewExpense.module.scss";
import { incomeExpenseValidationSchema } from "../../assets/validation/incomeExpenseValidationSchema";
import { IncomeExpense } from "../../interfaces/incomeExpense";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewExpenseAsync,
  getExpenseSourcesAsync,
} from "../../stores/expenseSlice";

function NewIncome() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.id);
  const expenseSources = useSelector(
    (state: any) => state.expense.expenseSources
  );

  useEffect(() => {
    dispatch(getExpenseSourcesAsync(token));
  }, [dispatch, token]);

  const onSubmit = (values: IncomeExpense) => {
    values.userId = userId;
    dispatch(createNewExpenseAsync({ expenseData: values, token: token })).then(
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
        sourceId: expenseSources[0].id,
      }}
      onSubmit={onSubmit}
      validationSchema={incomeExpenseValidationSchema}
    >
      <Form className={styles.expense}>
        <h1 className={styles.expense__title}>New Expense</h1>
        <div className={styles.expense__item}>
          <label htmlFor="name" className={styles.expense__item__label}>
            Name
          </label>
          <Field
            id="name"
            name="name"
            className={styles.expense__item__input}
          />
          <ErrorMessage
            name="name"
            className={styles.expense__item__error}
            component="div"
          />
        </div>
        <div className={styles.expense__item}>
          <label htmlFor="amount" className={styles.expense__item__label}>
            Amount
          </label>
          <Field
            id="amount"
            name="amount"
            type="number"
            step={0.01}
            min={1}
            className={styles.expense__item__input}
          />
          <ErrorMessage
            name="amount"
            className={styles.expense__item__error}
            component="div"
          />
        </div>
        <div className={styles.expense__item}>
          <label htmlFor="date" className={styles.expense__item__label}>
            Date
          </label>
          <Field
            id="date"
            name="date"
            type="date"
            className={styles.expense__item__input}
          />
          <ErrorMessage
            name="date"
            className={styles.expense__item__error}
            component="div"
          />
        </div>
        <div className={styles.expense__item}>
          <label htmlFor="sourceId" className={styles.expense__item__label}>
            Date
          </label>
          <Field
            id="sourceId"
            name="sourceId"
            as="select"
            className={styles.expense__item__input}
          >
            {expenseSources.map((source: any, key: any) => (
              <option key={key} value={source.id}>
                {source.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="sourceId"
            className={styles.expense__item__error}
            component="div"
          />
        </div>
        <div className={styles["expense__item--flex"]}>
          <button className={styles.expense__item__button} type="submit">
            Add
          </button>
          <button className={styles.expense__item__button} type="reset">
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NewIncome;
