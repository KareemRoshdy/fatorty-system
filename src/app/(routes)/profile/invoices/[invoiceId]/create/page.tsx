import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import UserCard from "@/components/UserCard";
import { User } from "lucide-react";
import { redirect } from "next/navigation";
import InvoiceFormData from "./_components/InvoiceFormData";
import InvoiceActions from "./_components/InvoiceActions";
import { getAllProducts } from "@/actions/products.action";

interface CreateInvoicePageProps {
  params: {
    invoiceId: string;
  };
}

const CreateInvoicePage = async ({ params }: CreateInvoicePageProps) => {
  const { invoiceId: userId } = await params;
  const products = await getAllProducts();

  const user = await getUserById(userId);

  if (!user) redirect(`/profile/invoices/${userId}`);

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between">
        <BackLink
          link={`/profile/invoices/${userId}`}
          name="العودة الي جميع الفواتير للمستخدم"
        />

        {/* <InvoiceActions /> */}
      </div>

      <div className="mt-10">
        {/* <UserCard
          Icon={User}
          username={`إضافة فاتورة الي ${user.arabicName}`}
        /> */}

        <InvoiceFormData products={products} userId={userId} />
      </div>
    </div>
  );
};

export default CreateInvoicePage;
