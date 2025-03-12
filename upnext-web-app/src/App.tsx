import { HashRouter, Navigate, Route, Routes } from "react-router";
import UpNext from "./UpNext";
import "./App.css";
import SignUp from "./UpNext/pages/SignUp";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="UpNext/SignUp" />} />
          <Route path="/UpNext/*" element={<UpNext />} />
          <Route path="/UpNext/SignUp" element={<SignUp />} />
          <Route path="/UpNext/LogIn" element={<h1>Inside SignIn</h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
