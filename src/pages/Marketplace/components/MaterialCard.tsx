import { Button } from "@/components/ui/button";
import { Material } from "../data/schema";

interface MaterialCardProps {
  material: Material;
}

const MaterialCard = ({ material }: MaterialCardProps) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-6">
      <img
        src={material.image}
        alt={material.name}
        className="w-40 h-40 object-cover rounded-md"
      />

      <div className="flex-1 flex justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg">{material.name}</h3>
            <p className="text-sm text-gray-500">Seller: {material.seller}</p>
            <p className="text-sm text-gray-500">Bid ID: {material.bidId}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="font-bold text-lg">{material.activeBid}</p>
              <p className="text-sm text-gray-500">Active bid</p>
            </div>
            <div>
              <p className="font-bold text-lg">
                {formatCurrency(material.currentPrice)}
              </p>
              <p className="text-sm text-gray-500">Current Price</p>
            </div>
            <div>
              <p className="font-bold text-lg">{material.volume}</p>
              <p className="text-sm text-gray-500">Volume</p>
            </div>
            <div>
              <p className="font-bold text-lg">{material.origin}</p>
              <p className="text-sm text-gray-500">Origin</p>
            </div>
          </div>
        </div>

        <div className="w-56 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Base Price</p>
          <p className="font-bold text-3xl mb-4">
            {formatCurrency(material.basePrice)}
          </p>
          <Button variant="outline" className="w-full mb-2 bg-gray-200">
            Show Material
          </Button>
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Make a bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
