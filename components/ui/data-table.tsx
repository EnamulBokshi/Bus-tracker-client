"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "lucide-react";
import { TableBody, TableCell, TableHeader, TableRow } from "./table";


interface DataTableProps<TData,TValue> {
    columns: ColumnDef<TData,TValue >[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>){

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

})

return (
    <div className="rounded-md border">
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((hederGroup) => (
                    <TableRow key={hederGroup.id}>
                        {
                            hederGroup.headers.map((header) =>{
                                return (
                                    <TableHeader key={header.id}>
                                        {
                                            header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </TableHeader>
                                )
                            })
                        }
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {
                    table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow  key={row.id}
                                data-state = {row.getIsSelected() && "selected"}
                            >
                                {
                                    row.getVisibleCells().map((cell) =>(
                                        <TableCell key={cell.id}>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </TableCell>
                                    ))
                                }   
                            </TableRow>
                        ))
                    ):(
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                No data available
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </div>
)

}