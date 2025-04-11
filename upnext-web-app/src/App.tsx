import { HashRouter, Navigate, Route, Routes } from "react-router";
import UpNext from "./UpNext";
import "./App.css";
import SignUp from "./UpNext/pages/SignUp/SignUp";
import LogIn from "./UpNext/pages/LogIn/LogIn";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="UpNext/LogIn" />} />
          <Route path="/UpNext/*" element={<UpNext />} />
          <Route path="/UpNext/Register" element={<SignUp />} />
          <Route path="/UpNext/LogIn" element={<LogIn />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
