import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMaterials } from "@/hooks/queries/useMaterials";
import { SlidersHorizontal } from "lucide-react";
import MaterialCard from "./components/MaterialCard";
import Pagination from "./components/Pagination";
// import { Material } from "./data/schema";
// import { materials } from "./data/seed";

const MarketplacePage = () => {
  const { data, isLoading } = useMaterials();
  return (
    <div className="p-8">
      <main className="flex-1 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <Input
            placeholder="Search materials"
            className="max-w-xs bg-gray-100"
          />
          <Button variant="outline">
            <SlidersHorizontal size={16} className="mr-2" />
            Sort by Price (Low to High)
          </Button>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            (data || []).map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))
          )}
        </div>
        <Pagination />
      </main>
    </div>
  );
};

export default MarketplacePage;
