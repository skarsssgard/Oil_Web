"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

export type Logging = {
    tanggal: string;
    waktu: string;
    volume: number;
};

export const columns: ColumnDef<Logging>[] = [
    {
        accessorKey: "tanggal",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "waktu",
        header: "Time",
    },
    {
        accessorKey: "volume",
        header: "Volume (Liter)",
    },
];
