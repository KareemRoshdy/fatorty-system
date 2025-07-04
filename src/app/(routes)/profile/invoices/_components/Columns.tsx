"use client";

import { Invoice } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { InvoiceWithUser } from "@/types";

export const columns: ColumnDef<InvoiceWithUser>[] = [
  {
    accessorFn: (row) => row.user?.arabicName,
    id: "arabicName", // لازم نحدد ID هنا علشان نقدر نفلتر
    header: ({ column }) => {
      return (
        <div className="w-fit ml-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            الاسم
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("arabicName") || "—"}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <div className="w-fit ml-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            السعر
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice")) || "0";

      const formatted = new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => {
      return (
        <div className="w-fit ml-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            تم الدفع
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isPaid = row.getValue("isPaid") || false;

      return (
        <Badge className={cn("bg-red-500 text-white", isPaid && "bg-sky-700")}>
          {isPaid ? "تم الدفع" : "لم يدفع"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center">
            <Link href={`/admin/wallet/${id}`}>
              <DropdownMenuItem>
                <PenLine className="h-4 w-4 mr-2" /> تعديل
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
