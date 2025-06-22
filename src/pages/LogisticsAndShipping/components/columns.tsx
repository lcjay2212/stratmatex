"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Shipping } from "../data/schema";

export const columns: ColumnDef<Shipping>[] = [
  {
    accessorKey: "shippingId",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Shipping ID <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("shippingId")}</div>
    ),
  },
  {
    accessorKey: "materials",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Materials <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("materials")}</div>
    ),
  },
  {
    accessorKey: "volume",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Volume <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("volume")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Date <Info size={16} />
      </div>
    ),
    cell: ({ row }) => <div className="text-left">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "origin",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Origin <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("origin")}</div>
    ),
  },
  {
    accessorKey: "dropLocation",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Drop Location <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("dropLocation")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="flex items-center gap-2 justify-end text-right">
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
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-left">
          <span
            className={cn(
              "px-4 py-2 rounded-full text-white",
              status === "Shipped" ? "bg-orange-500" : "bg-blue-500"
            )}
          >
            {status}
          </span>
        </div>
      );
    },
  },
];
