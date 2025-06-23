"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import { Bid } from "../data/schema";

export const columns: ColumnDef<Bid>[] = [
  {
    accessorKey: "bidding_id",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Bidding ID <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "material_name",
    header: () => (
      <div className="flex items-center  justify-center gap-2">
        Material <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "base_price",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Base Price <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "current_price",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Current Price <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "active_bids",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Active Bids <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Status <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "trader",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Trader <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Start Date <Info size={16} />
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: () => {
      return (
        <Button
          variant="default"
          size="sm"
          className="bg-black text-white rounded-full"
        >
          View
        </Button>
      );
    },
  },
];
