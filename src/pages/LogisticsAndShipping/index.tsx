import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useLogistic } from "@/hooks/queries/useLogistic";
import { columns } from "./components/columns";

const LogisticsAndShippingPage = () => {
  const { data, isLoading } = useLogistic();
  return (
    <div className="h-full w-full p-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">LOGISTICS & SHIPPING</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={data || []}
            searchKey="material_name"
          />
        )}
        <div className="flex justify-center mt-4">
          <Button variant="link" className="text-red-500">
            Contact Detail modal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogisticsAndShippingPage;
