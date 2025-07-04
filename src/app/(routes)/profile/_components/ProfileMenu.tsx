"use client";

import { cn } from "@/lib/utils";
import { BadgeDollarSign, BoxIcon, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

const ProfileMenu = () => {
  const menuItems = [
    {
      id: 1,
      name: "الفواتير",
      url: "/profile",
      icon: BadgeDollarSign,
    },
    {
      id: 2,
      name: "المنتجات",
      url: "/profile/products",
      icon: BoxIcon,
    },
    {
      id: 3,
      name: "المستخدمين",
      url: "/profile/users",
      icon: User,
    },
  ];

  const pathname = usePathname();

  return (
    <ul>
      {menuItems.map((item) => (
        <Link href={item.url} key={item.id}>
          <li
            className={cn(
              "p-3 hover:bg-primary/10 hover:text-primary flex items-center justify-center md:justify-start gap-2 text-sm ",
              pathname === item.url && "bg-primary/10 text-primary"
            )}
          >
            <item.icon className="size-5" />
            <span className="hidden md:inline-block">{item.name}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ProfileMenu;
