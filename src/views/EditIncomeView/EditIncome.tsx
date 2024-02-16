/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditIncome.module.scss";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { incomeExpenseValidationSchema } from "../../assets/validation/incomeExpenseValidationSchema";
import { useEffect } from "react";
import { IncomeExpense } from "../../interfaces/incomeExpense";
import { useDispatch, useSelector } from "react-redux";
import {
  editIncomeAsync,
  getIncomeByIdAsync,
  getIncomeSourcesAsync,
} from "../../stores/incomeSlice";

function EditIncome() {
  const { id } = useParams();
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.id);
  const singleIncome = useSelector((state: any) => state.income.singleIncome);
  const incomeSources = useSelector((state: any) => state.income.incomeSources);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  useEffect(() => {
    // if path incorrect redirect to home
    if (isNaN(+id!)) {
      navigate("/");
    } else {
      dispatch(getIncomeByIdAsync({ id: +id!, token: token })).then(
        (data: any) => {
          if (data.payload.user.id !== userId) {
            navigate("/");
          }
          dispatch(getIncomeSourcesAsync(token));
        }
      );
    }
  }, [id, navigate, token, dispatch, singleIncome, userId]);

  const onSubmit = (values: IncomeExpense) => {
    values.userId = userId;
    dispatch(editIncomeAsync({ id: +id!, data: values, token: token })).then(
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
        name: singleIncome.name,
        amount: singleIncome.amount,
        date: new Date(singleIncome.date).toISOString().substr(0, 10),
        sourceId: singleIncome.incomeSource.id,
      }}
    >
      <Form className={styles.income}>
        <h1 className={styles.income__title}>Edit Income</h1>
        <div className={styles.income__item}>
          <label htmlFor="name" className={styles.income__item__label}>
            Name
          </label>
          <Field
            id="name"
            name="name"
            className={styles.income__item__input}
          ></Field>
          <ErrorMessage
            name="name"
            className={styles.income__item__error}
            component="div"
          ></ErrorMessage>
        </div>
        <div className={styles.income__item}>
          <label htmlFor="amount" className={styles.income__item__label}>
            Amount
          </label>
          <Field
            id="amount"
            name="amount"
            className={styles.income__item__input}
            min={1}
            type="number"
            step={0.01}
          ></Field>
          <ErrorMessage
            name="amount"
            className={styles.income__item__error}
            component="div"
          ></ErrorMessage>
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
          ></Field>
          <ErrorMessage
            name="date"
            className={styles.income__item__error}
            component="div"
          ></ErrorMessage>
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
            {incomeSources.map((income: any, key: any) => (
              <option value={income.id} key={key}>
                {income.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="sourceId"
            className={styles.income__item__error}
            component="div"
          ></ErrorMessage>
        </div>
        <div
          className={`${styles.income__item} ${styles["income__item--flex"]}`}
        >
          <button className={styles.income__item__button} type="submit">
            Edit
          </button>
          <button
            className={styles.income__item__button}
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

export default EditIncome;
