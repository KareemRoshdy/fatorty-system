import { CupSodaIcon, LogInIcon } from "lucide-react";
import { ModeToggle } from "../ThemeBtnToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { UserMenu } from "../UserMenu";

const Header = async () => {
  const session = await auth();

  return (
    <header className="item-center shadow-md border-b z-50">
      <div className="w-full container item-between py-3 h-full">
        <Link href={"/"}>
          <div className="item-center gap-1 font-bold text-xl">
            <CupSodaIcon className="size-7" />
            فاتورتي
          </div>
        </Link>

        <div className="item-center gap-3">
          {!session ? (
            <Link href={"/login"}>
              <Button type="button" className="cursor-pointer text-sm">
                <p className="hidden md:block">تسجيل الدخول</p>

                <div className="item-center gap-2 md:hidden!">
                  <p>تسجيل</p>
                  <LogInIcon />
                </div>
              </Button>
            </Link>
          ) : (
            <UserMenu />
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
