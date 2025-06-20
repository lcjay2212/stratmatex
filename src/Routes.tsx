import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import MaterialsPage from "./pages/materials";
import RegisterPage from "./pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Error</div>,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "materials", element: <MaterialsPage /> },
      { path: "*", element: <NotFoundPage /> }, // fallback for unknown routes
    ],
  },
  {
    path: "/",
  },
]);
