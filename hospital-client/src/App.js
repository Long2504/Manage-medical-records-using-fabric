import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./page/LoginScreen";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePageDoctor from "./page/doctor/HomePage.doctor";
import HomePageAdmin from "./page/admin/HomePage.admin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ForgotPasswordPage from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import PasswordConfirmCode from "./page/PasswordConfirmCode";

function App() {
  const { loggedIn, role } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  useEffect(() => {}, [loggedIn, dispatch]);
  if (loggedIn) {
    if (role === "doctor") {
      return (
        <Router>
          <HomePageDoctor></HomePageDoctor>
        </Router>
      );
    }
    if (role === "admin") {
      return (
        <Router>
          <HomePageAdmin></HomePageAdmin>
        </Router>
      );
    }
  }
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route element={<LoginScreen />} path="/login"></Route>
          <Route element={<ResetPassword />} path="/password_reset"></Route>
          <Route
            element={<ForgotPasswordPage />}
            path="/forgot-password"></Route>
          <Route
            element={<PasswordConfirmCode />}
            path="/verify-code"></Route>
          <Route element={<Navigate to="/login" replace />} path="*"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
