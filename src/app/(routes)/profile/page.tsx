import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
  BoxIcon,
  CircleDollarSign,
  ShieldUserIcon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";

import UserProfileSection from "./_components/UserProfileSection";
import { getInvoicesByUserId } from "@/actions/invoices.action";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  const adminLinks = [
    {
      id: 1,
      name: "الفواتير",
      icon: CircleDollarSign,
      link: "/profile/invoices",
    },
    {
      id: 2,
      name: "المنتجات",
      icon: BoxIcon,
      link: "/profile/products",
    },
    {
      id: 3,
      name: "المستخدمين",
      icon: Users2Icon,
      link: "/profile/users",
    },
  ];

  const userInvoices = await getInvoicesByUserId(session.user.id);

  return (
    <div className="w-full">
      <h2 className="md:text-xl font-bold flex items-center gap-1 bg-primary/10 p-2 rounded-md text-primary w-fit">
        <ShieldUserIcon />
        {session.user.role === "ADMIN" ? " صفحة الادمن" : "الملف الشخصي"}
      </h2>

      {session.user.role === "ADMIN" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-3">
          {adminLinks.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              className="p-2 py-3 bg-card border border-border shadow-md  rounded-sm flex items-center gap-2 hover:-translate-y-0.5 transition-all hover:shadow-primary/20 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              <link.icon className="size-8 md:size-10 p-2 rounded-full bg-primary/10 text-primary" />

              <p className="text-sm md:text-xl">{link.name}</p>
            </Link>
          ))}
        </div>
      )}

      {session.user.role === "USER" && (
        <UserProfileSection userInvoices={userInvoices} />
      )}
    </div>
  );
};

export default ProfilePage;
