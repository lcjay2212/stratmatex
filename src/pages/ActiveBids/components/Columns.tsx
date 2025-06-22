"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, Info } from "lucide-react";
import { Bid } from "../data/schema";

export const columns: ColumnDef<Bid>[] = [
  {
    accessorKey: "bidId",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Bid ID <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "materials",
    header: () => (
      <div className="flex items-center  justify-center gap-2">
        Materials <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "minimumIncrement",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Minimum Increment <Info size={16} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("minimumIncrement"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
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
    accessorKey: "basePrice",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Base Price <Info size={16} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("basePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "timer",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Timer <Info size={16} />
      </div>
    ),
    cell: ({ row }) => {
      const timer: { startTime: string; endTime: string } =
        row.getValue("timer");
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <Clock size={16} /> {timer.startTime}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock size={16} /> {timer.endTime}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "currentPrice",
    header: () => (
      <div className="flex items-center justify-center gap-2">
        Current Price <Info size={16} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("currentPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
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
