import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import UserCard from "@/components/UserCard";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

interface EditInvoicePageProps {
  params: {
    invoiceId: string;
    editId: string;
  };
}

const EditInvoicePage = async ({ params }: EditInvoicePageProps) => {
  const { invoiceId: userId, editId } = await params;

  const user = await getUserById(userId);

  if (!user) redirect(`/profile/invoices/${userId}`);

  return (
    <div className="pb-16">
      <BackLink
        link={`/profile/invoices/${userId}`}
        name="العودة الي جميع الفواتير"
      />

      <div className="mt-10">
        <UserCard Icon={User} username={`تعديل فاتورة ${user.arabicName}`} />
      </div>
    </div>
  );
};

export default EditInvoicePage;
