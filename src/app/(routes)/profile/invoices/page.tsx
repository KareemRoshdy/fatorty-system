import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BackLink from "@/components/BackLink";
import Link from "next/link";
import { DollarSignIcon, User } from "lucide-react";
import { getAllUsers } from "@/actions/users.action";
import UserCard from "@/components/UserCard";

const InvoicesPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  const users = await getAllUsers();

  return (
    <div className="pb-16">
      <BackLink link="/profile" name="العودة الي الملف الشخصي" />

      <h2 className="md:text-xl font-bold flex items-center gap-1 bg-primary/10 p-2 rounded-md text-primary w-fit mt-10">
        <DollarSignIcon />
        جميع الفواتير
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-x-5 gap-y-8">
        {users.map((link) => (
          <UserCard
            as={Link}
            key={link.id}
            href={`/profile/invoices/${link.id}`}
            username={link.arabicName}
            Icon={User}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoicesPage;
