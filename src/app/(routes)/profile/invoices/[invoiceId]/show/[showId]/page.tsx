import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import UserCard from "@/components/UserCard";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

interface ShowInvoicePageProps {
  params: {
    invoiceId: string;
    showId: string;
  };
}

const ShowInvoicePage = async ({ params }: ShowInvoicePageProps) => {
  const { invoiceId: userId, showId } = await params;

  const user = await getUserById(userId);

  if (!user) redirect(`/profile/invoices/${userId}`);

  return (
    <div className="pb-16">
      <BackLink
        link={`/profile/invoices/${userId}`}
        name="العودة الي جميع الفواتير"
      />

      <div className="mt-10">
        <UserCard Icon={User} username={`عرض فاتورة ${user.arabicName}`} />
      </div>
    </div>
  );
};

export default ShowInvoicePage;
