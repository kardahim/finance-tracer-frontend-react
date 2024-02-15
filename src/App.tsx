/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footbar/Footer";
import Navigation from "./components/Navigation/Navigation";

// import Login from "./views/LoginView/Login";
// import Register from "./views/RegisterView/Register";
// import NewIncome from "./views/NewIncomeView/NewIncome";
// import NewExpense from "./views/NewExpenseView/NewExpense";
// import EditIncome from "./views/EditIncomeView/EditIncome";
// import EditExpense from "./views/EditExpenseView/EditExpense";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, refreshAsync } from "./stores/authSlice";
import React from "react";

const Home = React.lazy(() => import("./views/HomeView/Home"));
const Login = React.lazy(() => import("./views/LoginView/Login"));
const Register = React.lazy(() => import("./views/RegisterView/Register"));
const NewIncome = React.lazy(() => import("./views/NewIncomeView/NewIncome"));
const NewExpense = React.lazy(
  () => import("./views/NewExpenseView/NewExpense")
);
const EditIncome = React.lazy(
  () => import("./views/EditIncomeView/EditIncome")
);
const EditExpense = React.lazy(
  () => import("./views/EditExpenseView/EditExpense")
);

function App() {
  const dispatch: any = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    dispatch(refreshAsync(token)).catch(() => {
      dispatch(logout());
    });
  }, [dispatch, token]);

  return (
    <div id="app">
      <Router>
        <Navigation />
        <div id="content">
          <Suspense fallback={"loading..."}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/income/new" element={<NewIncome />} />
              <Route path="/expense/new" element={<NewExpense />} />
              <Route path="/income/edit/:id" element={<EditIncome />} />
              <Route path="/expense/edit/:id" element={<EditExpense />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
