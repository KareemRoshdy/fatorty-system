import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import UserCard from "@/components/UserCard";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

interface CreateInvoicePageProps {
  params: {
    invoiceId: string;
  };
}

const CreateInvoicePage = async ({ params }: CreateInvoicePageProps) => {
  const { invoiceId: userId } = await params;

  const user = await getUserById(userId);

  if (!user) redirect(`/profile/invoices/${userId}`);

  return (
    <div className="pb-16">
      <BackLink
        link={`/profile/invoices/${userId}`}
        name="العودة الي جميع الفواتير للمستخدم"
      />

      <div className="mt-10">
        <UserCard
          Icon={User}
          username={`إضافة فاتورة الي ${user.arabicName}`}
        />
      </div>
    </div>
  );
};

export default CreateInvoicePage;
