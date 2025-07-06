"use client";

import { User } from "@prisma/client";
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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "arabicName",
    header: ({ column }) => {
      return (
        <div className="w-fit ml-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            إسم المستخدم
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="w-fit ml-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            الصلاحية
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      return (
        <Badge
          className={cn(
            "text-white",
            role === "ADMIN" ? "bg-green-600" : "bg-gray-500"
          )}
        >
          {role === "ADMIN" ? "أدمن" : "مستخدم عادي"}
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
            <Link href={`/profile/users/${id}`}>
              <DropdownMenuItem dir="rtl">
                <PenLine className="h-4 w-4 mr-2" /> تعديل
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
