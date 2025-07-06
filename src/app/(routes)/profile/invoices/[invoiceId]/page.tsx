import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import { Button } from "@/components/ui/button";
import { DollarSignIcon, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DataTable } from "../_components/DataTable";
import { columns } from "../_components/Columns";
import UserCard from "@/components/UserCard";

interface InvoiceUserPageProps {
  params: {
    invoiceId: string;
  };
}

const InvoiceUserPage = async ({ params }: InvoiceUserPageProps) => {
  const { invoiceId } = await params;
  const user = await getUserById(invoiceId);

  if (!user) redirect("/profile/invoices");

  return (
    <div className="pb-16">
      <BackLink link="/profile/invoices" name="العودة الي جميع الفواتير" />

      <div className="mt-10">
        <UserCard Icon={User} username={`جميع فواتير ${user.arabicName}`} />

        {user.invoices?.length === 0 && (
          <div className="flex flex-col items-center gap-5">
            <DollarSignIcon className="size-20 p-5 bg-primary/30 rounded-full text-primary border " />
            <h2 className="text-xl w-fit m-auto p-3 bg-destructive/10 text-destructive rounded-md text-center">
              لا توجد فواتير لهذا المستخدم
            </h2>
            <Link href={`/profile/invoices/${invoiceId}/create`}>
              <Button className="cursor-pointer">إضافة فاتورة جديدة</Button>
            </Link>
          </div>
        )}

        {user.invoices?.length !== 0 && (
          <DataTable
            userId={invoiceId}
            columns={columns}
            data={user.invoices}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceUserPage;
