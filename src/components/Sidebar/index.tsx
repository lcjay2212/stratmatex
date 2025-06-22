import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

const filterOptions = [
  "Antimony",
  "Antimony Ingot",
  "Antimony Ore – Stibnite",
  "Bismuth",
  "Chrome Concentrate",
  "Nano-Copper (Hyper-fine 5nm)",
  "Nano-Copper (Ultra-fine 35nm)",
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-80 bg-white p-4 space-y-2 flex flex-col">
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
        {pathname === "/dashboard/marketplace" && (
          <>
            <hr className="my-4" />
            <div className="p-2">
              <h3 className="font-bold text-lg mb-4">Filter by Materials</h3>
              <div className="space-y-4">
                {filterOptions.map((option, index) => (
                  <div className="flex items-center space-x-2" key={option}>
                    <Checkbox
                      id={`filter-${index}`}
                      className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      defaultChecked={option.includes(
                        "Nano-Copper (Hyper-fine 5nm)"
                      )}
                    />
                    <Label htmlFor={`filter-${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
