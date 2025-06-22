import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { shippings } from "./data/seed";

const LogisticsAndShippingPage = () => {
  return (
    <div className="h-full w-full p-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">LOGISTICS & SHIPPING</h2>
        <DataTable columns={columns} data={shippings} searchKey="materials" />
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
