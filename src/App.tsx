import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footbar/Footer";
import Navigation from "./components/Navigation/Navigation";
import Home from "./views/HomeView/Home";
import Login from "./views/LoginView/Login";
import Register from "./views/RegisterView/Register";
import NewIncome from "./views/NewIncomeView/NewIncome";
import NewExpense from "./views/NewExpenseView/NewExpense";
import EditIncome from "./views/EditIncomeView/EditIncome";
import EditExpense from "./views/EditExpenseView/EditExpense";

function App() {
  return (
    <div id="app">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/income/new" element={<NewIncome />} />
          <Route path="/expense/new" element={<NewExpense />} />
          <Route path="/income/edit/:id" element={<EditIncome />} />
          <Route path="/expense/edit/:id" element={<EditExpense />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
