import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
