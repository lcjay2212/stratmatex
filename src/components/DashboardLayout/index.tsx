import StratMateXLogo from "@/assets/stratmatex-logo.png";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { Outlet } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <img src={StratMateXLogo} alt="StratMateX" className="h-10" />
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:text-gray-300">
          <Globe size={16} className="mr-2" />
          Change language
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <Button variant="ghost" className="text-white hover:text-gray-300">
          Log out
        </Button>
      </div>
    </header>
  );
};

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-auto">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
