/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIncomeAsync,
  getIncomeListAsync,
} from "../../stores/incomeSlice";
import {
  deleteExpenseAsync,
  getExpenseListAsync,
} from "../../stores/expenseSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Colors,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// FIXME: problem with missing <tr></tr> in table head (also in vue)
function Home() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

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

  const expenseSum = expenses.reduce((acc: any, entry: any) => {
    const expenseSourceName = entry.expenseSource.name;
    const totalAmount = acc[expenseSourceName]
      ? acc[expenseSourceName] + entry.amount
      : entry.amount;
    acc[expenseSourceName] = totalAmount;
    return acc;
  }, {} as { [key: string]: number });

  const incomeSum = income.reduce((acc: any, entry: any) => {
    const IncomeSourceName = entry.incomeSource.name;
    const totalAmount = acc[IncomeSourceName]
      ? acc[IncomeSourceName] + entry.amount
      : entry.amount;
    acc[IncomeSourceName] = totalAmount;
    return acc;
  }, {} as { [key: string]: number });

  const IncomeData: {
    labels: string[];
    datasets: [{ backgroundColor?: string[]; data: number[] }];
  } = {
    labels: Object.keys(incomeSum),
    datasets: [
      {
        // backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
        data: Object.values(incomeSum),
      },
    ],
  };

  const ExpenseData: {
    labels: string[];
    datasets: [{ backgroundColor?: string[]; data: number[] }];
  } = {
    labels: Object.keys(expenseSum),
    datasets: [
      {
        // backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: Object.values(expenseSum),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
  };

  ChartJS.register(ArcElement, Tooltip, Legend, Colors);

  const deleteExpense = (expenseId: number) => {
    dispatch(deleteExpenseAsync({ expenseId: expenseId, token: token })).then(
      () => {
        dispatch(
          getExpenseListAsync({
            userId: userId,
            token: token,
          })
        );
      }
    );
  };

  const deleteIncome = (incomeId: number) => {
    dispatch(deleteIncomeAsync({ incomeId: incomeId, token: token })).then(
      () => {
        dispatch(
          getIncomeListAsync({
            userId: userId,
            token: token,
          })
        );
      }
    );
  };

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
                    <button onClick={() => deleteIncome(income.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/income/edit/${income.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className={styles["home__card__table__body__btn-row"]}>
              <td colSpan={100}>
                <button onClick={() => navigate("/income/new")}>
                  Add new income
                </button>
              </td>
            </tr>
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
                    <button onClick={() => deleteExpense(expense.id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/expense/edit/${expense.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className={styles["home__card__table__body__btn-row"]}>
              <td colSpan={100}>
                <button onClick={() => navigate("/expense/new")}>
                  Add new expense
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* income card chart */}
      <div className={styles.home__card}>
        <h1 className={styles.home__card__title}>Income Sources</h1>
        <div className={styles.home__card__chart}>
          <Pie
            options={chartOptions}
            data={IncomeData}
            height={300}
            width={300}
          />
        </div>
      </div>
      {/* expense card chart */}
      <div className={styles.home__card}>
        <h1 className={styles.home__card__title}>Expense Sources</h1>
        <div className={styles.home__card__chart}>
          <Pie
            options={chartOptions}
            data={ExpenseData}
            height={300}
            width={300}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
