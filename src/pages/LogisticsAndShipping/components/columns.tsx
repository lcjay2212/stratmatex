"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Shipping } from "../data/schema";

export const columns: ColumnDef<Shipping>[] = [
  {
    accessorKey: "reference_number",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Shipping ID <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("reference_number")}</div>
    ),
  },
  {
    accessorKey: "material_name",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Materials <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("material_name")}</div>
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
    accessorKey: "drop",
    header: () => (
      <div className="flex items-center gap-2 text-left">
        Drop Location <Info size={16} />
      </div>
    ),
    cell: ({ row }) => <div className="text-left">{row.getValue("drop")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="flex items-center gap-2 justify-end text-right">
        Amount <Info size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-right">{row.getValue("amount")}</div>
    ),
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
