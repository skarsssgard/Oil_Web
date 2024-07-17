"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageSize,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([{ id: "tanggal", desc: true },{ id: "waktu", desc: true }]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: pageSize || 5,
        },
    },
      state: {
        sorting,
        columnFilters,
      },
  });

  return (
      <div className="row-span-3 col-span-3">
          <Table>
              <TableHeader >
                  {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                              return (
                                  <TableHead
                                      className="text-center text-lg text-black"
                                      key={header.id}
                                  >
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
              <TableBody className="text-center text-lg text-black">
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
          <div className="flex items-center justify-end space-x-2 p-4">
              <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
              >
                  Previous
              </Button>
              <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
              >
                  Next
              </Button>
          </div>
      </div>
  );
}
