import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/Columns";
import { bids } from "./data/seed";

const ActiveBidsPage = () => {
  return (
    <div className="h-full w-full p-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">ACTIVE BIDS</h2>
        <DataTable columns={columns} data={bids} searchKey="materials" />
      </div>
    </div>
  );
};

export default ActiveBidsPage;
