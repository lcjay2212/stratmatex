import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "./components/AuthGuard/AuthGuard";
import DashboardLayout from "./components/DashboardLayout";
import Layout from "./components/Layout";
import HomePage from "./pages";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import ActiveBidsPage from "./pages/ActiveBids";
import ContactPage from "./pages/contact";
import HelpPage from "./pages/Help";
import LoginPage from "./pages/login";
import LogisticsAndShippingPage from "./pages/LogisticsAndShipping";
import MarketplacePage from "./pages/Marketplace";
import MaterialsPage from "./pages/materials";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/register";
import SellMaterialsPage from "./pages/SellMaterials";
import WebSocketTestPage from "./pages/websocket-test";

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
      { path: "websocket-test", element: <WebSocketTestPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "active-bids",
        element: <ActiveBidsPage />,
      },
      {
        path: "logistics",
        element: <LogisticsAndShippingPage />,
      },
      {
        path: "marketplace",
        element: <MarketplacePage />,
      },
      {
        path: "sell-materials",
        element: <SellMaterialsPage />,
      },
      {
        path: "my-profile",
        element: <ProfilePage />,
      },
      { path: "help", element: <HelpPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
