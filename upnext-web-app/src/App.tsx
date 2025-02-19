import { HashRouter, Navigate, Route, Routes } from "react-router";
import UpNext from "./UpNext";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="UpNext" />} />
          <Route path="/UpNext/*" element={<UpNext />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
