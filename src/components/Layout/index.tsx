import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";

const hideNavbarRoutes = ["/", "/about", "/contact", "/materials"];

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const shouldShowNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col justify-between text-white">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {shouldShowNavbar && <Footer />}
    </div>
  );
}
