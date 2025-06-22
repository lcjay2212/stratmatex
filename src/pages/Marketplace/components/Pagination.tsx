import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="secondary"
        size="icon"
        disabled
        className="disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        className="bg-orange-500 text-white border-orange-500"
      >
        1
      </Button>
      <Button variant="secondary" className="bg-gray-200">
        2
      </Button>
      <Button variant="secondary" className="bg-gray-200">
        3
      </Button>
      <Button variant="secondary" className="bg-gray-200">
        4
      </Button>
      <Button variant="secondary" className="bg-gray-200">
        ...
      </Button>
      <Button variant="secondary" size="icon" className="bg-gray-200">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
