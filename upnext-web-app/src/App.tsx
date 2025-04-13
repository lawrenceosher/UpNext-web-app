import { HashRouter, Navigate, Route, Routes } from "react-router";
import UpNext from "./UpNext";
import "./App.css";
import SignUp from "./UpNext/pages/SignUp/SignUp";
import LogIn from "./UpNext/pages/LogIn/LogIn";
import { Provider } from "react-redux";
import store from "./UpNext/store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="UpNext/LogIn" />} />
            <Route path="/UpNext/*" element={<UpNext />} />
            <Route path="/UpNext/Register" element={<SignUp />} />
            <Route path="/UpNext/LogIn" element={<LogIn />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
