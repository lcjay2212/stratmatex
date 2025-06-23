import { DataTable } from "@/components/ui/data-table";
import { useActiveBids } from "@/hooks/queries/useActiveBids";
import { columns } from "./components/Columns";

const ActiveBidsPage = () => {
  const { data, isLoading } = useActiveBids();

  return (
    <div className="h-full w-full p-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">ACTIVE BIDS</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={data || []}
            searchKey="material_name"
          />
        )}
      </div>
    </div>
  );
};

export default ActiveBidsPage;
