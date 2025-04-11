import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages";
import RegisterPage from "./pages/register";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/about", "/contact"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col justify-between text-white">
      {shouldHideNavbar && <Navbar />}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      {shouldHideNavbar && <Footer />}
    </div>
  );
}

export default App;
