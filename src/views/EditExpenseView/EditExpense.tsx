/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditExpense.module.scss";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { incomeExpenseValidationSchema } from "../../assets/validation/incomeExpenseValidationSchema";
import { useEffect } from "react";
import { IncomeExpense } from "../../interfaces/incomeExpense";
import { useDispatch, useSelector } from "react-redux";
import {
  editExpenseAsync,
  getExpenseByIdAsync,
  getExpenseSourcesAsync,
} from "../../stores/expenseSlice";

function EditExpense() {
  const { id } = useParams();
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.id);
  const singleExpense = useSelector(
    (state: any) => state.expense.singleExpense
  );
  const expenseSources = useSelector(
    (state: any) => state.expense.expenseSources
  );
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  useEffect(() => {
    // if path incorrect redirect to home
    if (isNaN(+id!)) {
      navigate("/");
    } else {
      dispatch(getExpenseByIdAsync({ id: +id!, token: token })).then(
        (data: any) => {
          if (data.payload.user.id !== userId) {
            navigate("/");
          }
          dispatch(getExpenseSourcesAsync(token));
        }
      );
    }
  }, [id, navigate, token, dispatch, singleExpense, userId]);

  const onSubmit = (values: IncomeExpense) => {
    values.userId = userId;
    dispatch(editExpenseAsync({ id: +id!, data: values, token: token })).then(
      () => {
        navigate("/");
      }
    );
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={incomeExpenseValidationSchema}
      initialValues={{
        name: singleExpense.name,
        amount: singleExpense.amount,
        date: new Date(singleExpense.date).toISOString().substr(0, 10),
        sourceId: singleExpense.expenseSource.id,
      }}
    >
      <Form className={styles.expense}>
        <h1 className={styles.expense__title}>Edit Expense</h1>
        <div className={styles.expense__item}>
          <label htmlFor="name" className={styles.expense__item__label}>
            Name
          </label>
          <Field
            id="name"
            name="name"
            className={styles.expense__item__input}
          ></Field>
          <ErrorMessage
            name="name"
            className={styles.expense__item__error}
            component="div"
          ></ErrorMessage>
        </div>
        <div className={styles.expense__item}>
          <label htmlFor="amount" className={styles.expense__item__label}>
            Amount
          </label>
          <Field
            id="amount"
            name="amount"
            className={styles.expense__item__input}
            min={1}
            type="number"
            step={0.01}
          ></Field>
          <ErrorMessage
            name="amount"
            className={styles.expense__item__error}
            component="div"
          ></ErrorMessage>
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
          ></Field>
          <ErrorMessage
            name="date"
            className={styles.expense__item__error}
            component="div"
          ></ErrorMessage>
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
            {expenseSources.map((expense: any, key: any) => (
              <option value={expense.id} key={key}>
                {expense.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="sourceId"
            className={styles.expense__item__error}
            component="div"
          ></ErrorMessage>
        </div>
        <div
          className={`${styles.expense__item} ${styles["expense__item--flex"]}`}
        >
          <button className={styles.expense__item__button} type="submit">
            Edit
          </button>
          <button
            className={styles.expense__item__button}
            type="reset"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default EditExpense;
