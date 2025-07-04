import { getAllInvoices } from "@/actions/invoices.action";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import BackLink from "@/components/BackLink";

const InvoicesPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  const invoices = await getAllInvoices();

  return (
    <div>
      <BackLink link="/profile" name="العودة الي الملف الشخصي" />
      <DataTable columns={columns} data={invoices} />
    </div>
  );
};

export default InvoicesPage;
