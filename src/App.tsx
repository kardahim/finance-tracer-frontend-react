/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footbar/Footer";
import Navigation from "./components/Navigation/Navigation";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, refreshAsync } from "./stores/authSlice";
import RouterView from "./router/RouterView";

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
            <RouterView />
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
