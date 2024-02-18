import { Navigate, Route, Routes } from "react-router-dom";
import AuthRouteOnly from "./AuthRouteOnly";
import NoAuthRouteOnly from "./NoAuthRouteOnly";
import React from "react";

const Home = React.lazy(() => import("../views/HomeView/Home"));
const Login = React.lazy(() => import("../views/LoginView/Login"));
const Register = React.lazy(() => import("../views/RegisterView/Register"));
const NewIncome = React.lazy(() => import("../views/NewIncomeView/NewIncome"));
const NewExpense = React.lazy(
  () => import("../views/NewExpenseView/NewExpense")
);
const EditIncome = React.lazy(
  () => import("../views/EditIncomeView/EditIncome")
);
const EditExpense = React.lazy(
  () => import("../views/EditExpenseView/EditExpense")
);

function RouterView() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRouteOnly>
            <Home />
          </AuthRouteOnly>
        }
      />
      <Route
        path="/login"
        element={
          <NoAuthRouteOnly>
            <Login />
          </NoAuthRouteOnly>
        }
      />
      <Route
        path="/register"
        element={
          <NoAuthRouteOnly>
            <Register />
          </NoAuthRouteOnly>
        }
      />
      <Route
        path="/income/new"
        element={
          <AuthRouteOnly>
            <NewIncome />
          </AuthRouteOnly>
        }
      />
      <Route
        path="/expense/new"
        element={
          <AuthRouteOnly>
            <NewExpense />
          </AuthRouteOnly>
        }
      />
      <Route
        path="/income/edit/:id"
        element={
          <AuthRouteOnly>
            <EditIncome />
          </AuthRouteOnly>
        }
      />
      <Route
        path="/expense/edit/:id"
        element={
          <AuthRouteOnly>
            <EditExpense />
          </AuthRouteOnly>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouterView;
