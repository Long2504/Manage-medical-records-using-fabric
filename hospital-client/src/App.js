import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./page/LoginScreen";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePageDoctor from "./page/doctor/HomePage.doctor";
import HomePageAdmin from "./page/admin/HomePage.admin";
import { useEffect } from "react";

function App() {
  const { loggedIn, role } = useSelector((state) => state.authSlice);
  console.log(loggedIn, "loggedIn");
  console.log(role, "role");
  useEffect(() => { }, [loggedIn]);
  if (loggedIn) {
    if (role === "doctor") {
      return (
        <Router>
          <HomePageDoctor></HomePageDoctor>
        </Router>)
    }
    if (role === "admin") {
      return (
        <Router>
          <Routes>
            <Route element={<HomePageAdmin></HomePageAdmin>} path="/infor"></Route>

          </Routes>
        </Router>)
    }
  }
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route element={<LoginScreen />} path="/login"></Route>
          <Route element={<Navigate to="/login" replace />} path="*"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
