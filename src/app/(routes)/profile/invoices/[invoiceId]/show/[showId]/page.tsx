import { getInvoiceById } from "@/actions/invoices.action";
import { getAllProducts } from "@/actions/products.action";
import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import UserCard from "@/components/UserCard";
import { formatePrice } from "@/lib/formatPrice";
import { Product } from "@prisma/client";
import { User } from "lucide-react";
import { redirect } from "next/navigation";
import PrintInvoiceButton from "./_components/PrintBtn";
import { auth } from "@/lib/auth";

interface ShowInvoicePageProps {
  params: Promise<{
    invoiceId: string;
    showId: string;
  }>;
}

const ShowInvoicePage = async ({ params }: ShowInvoicePageProps) => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  const { invoiceId: userId, showId } = await params;

  const user = await getUserById(userId);

  if (!user) redirect(`/profile/invoices/${userId}`);

  const invoice = await getInvoiceById(showId);
  const products = await getAllProducts();

  const getProductsInInvoiceAndTotalPrice = (products: Product[]) => {
    if (!invoice) return { productsInInvoice: [], totalPrice: 0 };

    // 1. عدّ مرات تكرار كل منتج
    const productCountMap = invoice.invoiceProducts.reduce((acc, ip) => {
      acc[ip.productId] = (acc[ip.productId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 2. جيب المنتجات مع عدد مرات ظهورها (كمية محسوبة ضمنياً)
    const productsInInvoice = Object.entries(productCountMap)
      .map(([productId, count]) => {
        const product = products.find((p) => p.id === productId);
        return product
          ? {
              ...product,
              quantity: count,
            }
          : null;
      })
      .filter(Boolean) as (Product & { quantity: number })[];

    // 3. احسب السعر الكلي
    const totalPrice = productsInInvoice.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    return { productsInInvoice, totalPrice };
  };

  const { productsInInvoice, totalPrice } =
    getProductsInInvoiceAndTotalPrice(products);

  console.log({ productsInInvoice, totalPrice });

  return (
    <div className="pb-16">
      <BackLink
        link={`/profile/invoices/${userId}`}
        name="العودة الي جميع الفواتير"
      />

      <div className="mt-10 space-y-6">
        <UserCard Icon={User} username={`عرض فاتورة ${user.arabicName}`} />

        <div className=" shadow-md rounded-md p-6 border space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">بيانات الفاتورة</h2>
            <p className="text-sm text-gray-600">التاريخ: {invoice?.date}</p>
          </div>

          <div id="invoice-print" className="overflow-x-auto">
            <table className="w-full border text-right rtl">
              <thead className="bg-gray-300 text-gray-700 text-sm">
                <tr>
                  <th className="p-3 border">اسم المنتج</th>
                  <th className="p-3 border">الكمية</th>
                  <th className="p-3 border">السعر</th>
                  <th className="p-3 border">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {productsInInvoice.map((product) => (
                  <tr key={product.id} className="border-b ">
                    <td className="p-3 border">{product.name}</td>
                    <td className="p-3 border">{product.quantity}</td>
                    <td className="p-3 border">{product.price} ج.م</td>
                    <td className="p-3 border">
                      {product.price * product.quantity} ج.م
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex justify-end mb-4n">
              <PrintInvoiceButton />
            </div>

            <span className="text-lg font-semibold">
              السعر الكلي:{" "}
              <span className="text-primary" id="total-price">
                {" "}
                {formatePrice(totalPrice)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInvoicePage;
