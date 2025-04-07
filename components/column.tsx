"use client"
import {ColumnDef} from "@tanstack/react-table"

import {Bus,BusSchedule} from "@/types/types";

export const columns: ColumnDef<BusSchedule> [] = [
    {
        accessorKey: "busId",
        header: "Bus ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "route",
        header: "Route",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "driver",
        header: "Driver",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue(),
    }
]