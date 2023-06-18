import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./page/LoginScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<LoginScreen />} path="/login"></Route>
          {/* <Route element={<Navigate to="/signin" replace />} path="*"></Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
