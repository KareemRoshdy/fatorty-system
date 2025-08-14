import { getInvoiceById } from "@/actions/invoices.action";
import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import { redirect } from "next/navigation";
import InvoiceFormData from "../../create/_components/InvoiceFormData";
import { getAllProducts } from "@/actions/products.action";
import Banner from "@/components/Banner";
import { auth } from "@/lib/auth";

interface EditInvoicePageProps {
  params: Promise<{
    invoiceId: string;
    editId: string;
  }>;
}

const EditInvoicePage = async ({ params }: EditInvoicePageProps) => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  const { invoiceId: userId, editId } = await params;

  const user = await getUserById(userId);
  const invoice = await getInvoiceById(editId);
  const products = await getAllProducts();

  if (!user) redirect(`/profile/invoices/${userId}`);

  return (
    <div className="pb-16 ">
      {invoice?.isPaid && (
        <Banner variant="success" label=" تم سداد هذه الفاتورة" />
      )}
      {invoice?.isPaid === false && <Banner label="لم يتم سداد هذه الفاتورة" />}

      <BackLink
        link={`/profile/invoices/${userId}`}
        name="العودة الي جميع الفواتير"
      />

      <div className="mt-10">
        {/* <UserCard Icon={User} username={`تعديل فاتورة ${user.arabicName}`} /> */}
        <InvoiceFormData
          products={products}
          userId={userId}
          isPaid={invoice?.isPaid}
          initialData={{
            id: invoice!.id,
            date: invoice?.date ?? "",
            products: invoice?.invoiceProducts?.map((p) => p.productId) ?? [],
          }}
        />
      </div>
    </div>
  );
};

export default EditInvoicePage;
