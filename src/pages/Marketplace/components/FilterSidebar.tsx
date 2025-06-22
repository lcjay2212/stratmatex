import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const filterOptions = [
  "Antimony",
  "Antimony Ingot",
  "Antimony Ore – Stibnite",
  "Bismuth",
  "Chrome Concentrate",
  "Nano-Copper (Hyper-fine 5nm)",
  "Nano-Copper (Ultra-fine 35nm)",
];

const FilterSidebar = () => {
  return (
    <aside className="w-80 bg-white p-6 rounded-lg shadow-md self-start">
      <h3 className="font-bold text-lg mb-4">Filter by Materials</h3>
      <div className="space-y-4">
        {filterOptions.map((option, index) => (
          <div className="flex items-center space-x-2" key={option}>
            <Checkbox
              id={`filter-${index}`}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              defaultChecked={option.includes("Nano-Copper (Hyper-fine 5nm)")}
            />
            <Label htmlFor={`filter-${index}`}>{option}</Label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
