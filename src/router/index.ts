import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../views/HomeView/Home";
import Login from "../views/LoginView/Login";
import Register from "../views/RegisterView/Register";
import NewIncome from "../views/NewIncomeView/NewIncome";
import NewExpense from "../views/NewExpenseView/NewExpense";
import EditIncome from "../views/EditIncomeView/EditIncome";
import EditExpense from "../views/EditExpenseView/EditExpense";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: React.createElement(Home),
      },
      {
        path: "/login",
        element: React.createElement(Login),
      },
      {
        path: "/register",
        element: React.createElement(Register),
      },
      {
        path: "/income/new",
        element: React.createElement(NewIncome),
      },
      {
        path: "/expense/new",
        element: React.createElement(NewExpense),
      },
      {
        path: "/income/edit/:id",
        element: React.createElement(EditIncome),
      },
      {
        path: "/expense/edit/:id",
        element: React.createElement(EditExpense),
      },
    ],
  },
]);

export default router;
