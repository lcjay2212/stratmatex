"use client";

import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  // Mobile card view component
  const MobileCard = ({ row }: { row: Row<TData> }) => {
    return (
      <Card className="mb-4 md:hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            {(() => {
              const firstColumn = columns[0];
              if (firstColumn && "accessorKey" in firstColumn) {
                return (
                  row.getValue(firstColumn.accessorKey as string) || "Item"
                );
              }
              return "Item";
            })()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {row
            .getVisibleCells()
            .map((cell: Cell<TData, unknown>, index: number) => {
              // Skip the first column as it's used as the title
              if (index === 0) return null;

              const column = cell.column.columnDef;
              const header = column.header;

              // Skip action columns in mobile view
              if (column.id === "actions") return null;

              return (
                <div
                  key={cell.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-medium text-muted-foreground">
                    {typeof header === "string" ? header : "Field"}
                  </span>
                  <span className="text-right">
                    {flexRender(column.cell, cell.getContext())}
                  </span>
                </div>
              );
            })}
          {/* Show action button at the bottom */}
          {row.getVisibleCells().map((cell: Cell<TData, unknown>) => {
            const column = cell.column.columnDef;
            if (column.id === "actions") {
              return (
                <div key={cell.id} className="pt-2 border-t">
                  {flexRender(column.cell, cell.getContext())}
                </div>
              );
            }
            return null;
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
        <Input
          placeholder={`Search ${searchKey.split("_").join(" ")}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm bg-white"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <SlidersHorizontal size={16} className="mr-2" />
              Filter by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.map((row) => <MobileCard key={row.id} row={row} />)
        ) : (
          <Card>
            <CardContent className="h-24 flex items-center justify-center">
              <p className="text-muted-foreground">No results.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader className="bg-blue-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
