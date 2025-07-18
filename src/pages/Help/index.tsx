import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();

  const featureDefinitions = [
    {
      title: "Dashboard",
      description:
        "Overview of your account with important updates and summary information",
    },
    {
      title: "Active Bids",
      description:
        "Current auctions where you can place bids or track your existing offers",
    },
    {
      title: "Logistics & Shipping",
      description: "Monitor your purchases and track shipping status",
    },
    {
      title: "Marketplace",
      description:
        "Explore all materials available from verified suppliers on the exchange",
    },
    {
      title: "Sell a Material",
      description:
        "Create listings for materials you want to offer to other buyers",
    },
    {
      title: "My Material Listings",
      description:
        "Manage and track all the materials you currently have listed for sale",
    },
  ];

  const auctionTerms = [
    {
      title: "BID ID",
      description: "Your unique reference number for this auction",
    },
    {
      title: "Material",
      description: "The specific strategic material available for purchase",
    },
    {
      title: "Minimum Increment",
      description: "How much you must add to the current price when bidding",
    },
    {
      title: "Trader",
      description: "The verified supplier offering this material",
    },
    {
      title: "Base Price",
      description: "The price the auction started at",
    },
    {
      title: "Timer",
      description: "Countdown until the auction closes",
    },
    {
      title: "Current Price",
      description: "The highest bid amount at this moment",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Feature Definitions
            </h2>

            {featureDefinitions.map((feature, index) => (
              <div key={index} className="space-y-2 flex flex-row">
                <h3 className="text-lg font-semibold text-gray-700">
                  <strong>{feature.title}:</strong>
                </h3>
                <p className="text-gray-600 ml-4">{feature.description}</p>
              </div>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Auction Terms
            </h2>

            {auctionTerms.map((term, index) => (
              <div key={index} className="space-y-2 flex flex-row">
                <h3 className="text-lg font-semibold text-gray-700">
                  <strong>{term.title}:</strong>
                </h3>
                <p className="text-gray-600 ml-4">{term.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
