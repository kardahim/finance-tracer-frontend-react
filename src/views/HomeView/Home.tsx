/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getIncomeListAsync } from "../../stores/incomeSlice";
import { getExpenseListAsync } from "../../stores/expenseSlice";
import dayjs from "dayjs";

// FIXME: problem with missing <tr></tr> in table head (also in vue)
function Home() {
  const dispatch: any = useDispatch();

  const userId = useSelector((state: any) => state.auth.id);
  const token = useSelector((state: any) => state.auth.token);
  const income = useSelector((state: any) => state.income.income);
  const expenses = useSelector((state: any) => state.expense.expenses);

  useEffect(() => {
    dispatch(
      getIncomeListAsync({
        userId: userId,
        token: token,
      })
    );
    dispatch(
      getExpenseListAsync({
        userId: userId,
        token: token,
      })
    );
  }, [dispatch, userId, token]);

  return (
    <main className={styles.home}>
      {/* income card table */}
      <div className={styles.home__card}>
        <h1 className={styles.home__card__title}>Income</h1>
        <table className={styles.home__card__table}>
          <thead className={styles.home__card__table__head}>
            <td>Name</td>
            <td>Amount</td>
            <td>Date</td>
            <td>Income source</td>
            <td>Action</td>
          </thead>
          <tbody className={styles.home__card__table__body}>
            {income.map((income: any, key: any) => (
              <tr key={key}>
                <td>{income.name}</td>
                <td>{income.amount}</td>
                <td>{dayjs(income.date).format("DD/MM/YYYY")}</td>
                <td>{income.incomeSource.name}</td>
                <td>
                  <div
                    className={styles["home__card__table__body__btn-action"]}
                  >
                    {/* TODO: add edit and delete action */}
                    <button>Delete</button>
                    <button>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* expense card table */}
      <div className={styles.home__card}>
        <h1 className={styles.home__card__title}>Expenses</h1>
        <table className={styles.home__card__table}>
          <thead className={styles.home__card__table__head}>
            <td>Name</td>
            <td>Amount</td>
            <td>Date</td>
            <td>Expense source</td>
            <td>Action</td>
          </thead>
          <tbody className={styles.home__card__table__body}>
            {expenses.map((expense: any, key: any) => (
              <tr key={key}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{dayjs(expense.date).format("DD/MM/YYYY")}</td>
                <td>{expense.expenseSource.name}</td>
                <td>
                  <div
                    className={styles["home__card__table__body__btn-action"]}
                  >
                    {/* TODO: add edit and delete action */}
                    <button>Delete</button>
                    <button>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* income card chart */}
      <div className={styles.home__card}>
        <h1 className={styles.home__card__title}>Income Sources</h1>
        <div className={styles.home__card__chart}>{/* TODO: add chart */}</div>
      </div>
      {/* expense card chart */}
      <div className={styles.home__card}>
        <h1 className={styles.home__card__title}>Expense Sources</h1>
        <div className={styles.home__card__chart}>{/* TODO: add chart */}</div>
      </div>
    </main>
  );
}

export default Home;
