import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import RegisterPage from "./pages/register";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/about", "/contact"];
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col justify-between text-white">
      {shouldHideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {shouldHideNavbar && <Footer />}
    </div>
  );
}

export default App;
