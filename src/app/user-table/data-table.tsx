"use client"

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import * as React from "react"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  })
  const [selectedField, setSelectedField] = useState("email");
  return (
    <div className="rounded-lg border bg-white shadow-md">

      
      {/* Search Filter */}
      <div className="flex items-center gap-4 p-4 border-b bg-gray-50">
        {/* Dropdown for selecting filter field */}
        <select
          value={selectedField}
          onChange={(event) => setSelectedField(event.target.value)}
          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2"
        >
          {[
            { label: "First Name", value: "firstName" },
            { label: "Last Name", value: "lastName" },
            { label: "Username", value: "username" },
            { label: "Email", value: "email" },
            { label: "Phone", value: "phone" },
            { label: "Address", value: "address" },
            { label: "City", value: "city" },
            { label: "State", value: "state" },
          ].map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Input for filtering based on selected field */}
        <Input
          placeholder={`Search by ${selectedField}...`}
          value={(table.getColumn(selectedField)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(selectedField)?.setFilterValue(event.target.value)}
          className="w-full max-w-sm border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
        />
      </div>


      {/* Data Table */}
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-3 text-gray-700 font-medium">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3 text-gray-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination and Controls */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-gray-50 border-t">
        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-9 w-20 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div className="text-sm font-medium text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-300 transition hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-300 transition hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-300 transition hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-300 transition hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>

  )
}
