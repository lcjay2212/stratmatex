import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const sidebarLinks = [
  {
    name: "Active Bids",
    path: "/dashboard/active-bids",
  },
  {
    name: "Logistics & Shipping",
    path: "/dashboard/logistics",
  },
  {
    name: "Marketplace",
    path: "/dashboard/marketplace",
  },
  {
    name: "Sell Materials",
    path: "/dashboard/sell-materials",
  },
  {
    name: "My Materials",
    path: "/dashboard/my-materials",
  },
  {
    name: "My Profile",
    path: "/dashboard/my-profile",
  },
  {
    name: "Help",
    path: "/dashboard/help",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-64 bg-white p-4 space-y-2 flex flex-col">
      <div className="flex-1">
        {sidebarLinks.slice(0, 4).map((link) => (
          <Link to={link.path} key={link.name}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname.startsWith(link.path) &&
                  "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
              )}
            >
              {link.name}
            </Button>
          </Link>
        ))}
        <hr className="my-4" />
        <Link to={sidebarLinks[4].path}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname.startsWith(sidebarLinks[4].path) &&
                "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
            )}
          >
            {sidebarLinks[4].name}
          </Button>
        </Link>
        <hr className="my-4" />
        {sidebarLinks.slice(5).map((link) => (
          <Link to={link.path} key={link.name}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname.startsWith(link.path) &&
                  "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
              )}
            >
              {link.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
