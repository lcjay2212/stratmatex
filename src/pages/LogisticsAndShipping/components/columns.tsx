"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Shipping } from "../data/schema";

export const columns: ColumnDef<Shipping>[] = [
  {
    accessorKey: "shippingId",
    header: () => (
      <div className="flex items-center gap-2">
        Shipping ID <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "materials",
    header: () => (
      <div className="flex items-center gap-2">
        Materials <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "volume",
    header: () => (
      <div className="flex items-center gap-2">
        Volume <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="flex items-center gap-2">
        Date <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "origin",
    header: () => (
      <div className="flex items-center gap-2">
        Origin <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "dropLocation",
    header: () => (
      <div className="flex items-center gap-2">
        Drop Location <Info size={16} />
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="flex items-center gap-2">
        Amount <Info size={16} />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
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
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={cn(
            "px-4 py-2 rounded-full text-white",
            status === "Shipped" ? "bg-orange-500" : "bg-blue-500"
          )}
        >
          {status}
        </span>
      );
    },
  },
];
