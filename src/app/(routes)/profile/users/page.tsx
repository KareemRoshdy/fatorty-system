import BackLink from "@/components/BackLink";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { getAllUsers } from "@/actions/users.action";

const UsersPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  const users = await getAllUsers();

  return (
    <div className="pb-16">
      <BackLink link="/profile" name="العودة الي الملف الشخصي" />

      <DataTable columns={columns} data={users} />
      <div className=""></div>
    </div>
  );
};

export default UsersPage;
