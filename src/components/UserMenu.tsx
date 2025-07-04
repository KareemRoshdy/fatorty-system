import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import { logoutAction } from "@/actions/auth.actions";
import Link from "next/link";

export function UserMenu() {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <form action={logoutAction} className="text-right">
          <Button
            type="submit"
            variant={"ghost"}
            className="flex items-center justify-start cursor-pointer w-full text-red-500"
          >
            تسجيل الخروج
          </Button>
        </form>

        {/* <LogoutBtn /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
