import { getInvoiceNotPaid, getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import { redirect } from "next/navigation";
import React from "react";
import PayButton from "./_components/PayButton";
import PrintInvoiceButton from "../show/[showId]/_components/PrintBtn";

interface InvoicesUnPaidDetailsProps {
  params: {
    invoiceId: string;
  };
}

const InvoicesUnPaidDetails = async ({
  params,
}: InvoicesUnPaidDetailsProps) => {
  const { invoiceId } = await params;

  const user = await getUserById(invoiceId);
  if (!user) redirect("/profile/invoices");

  const invoicesUnPaid = await getInvoiceNotPaid(user.id);
  if (!invoicesUnPaid || invoicesUnPaid.length === 0) {
    return (
      <div className="pb-16 text-center">
        <BackLink
          link={`/profile/invoices/${invoiceId}`}
          name="العودة الي قائمة الفواتير"
        />
        <p className="text-gray-500 mt-10">لا توجد فواتير غير مدفوعة</p>
      </div>
    );
  }

  // 👇 دالة لتجميع المنتجات المتكررة
  const groupProducts = (
    items: (typeof invoicesUnPaid)[number]["invoiceProducts"]
  ) => {
    const grouped: {
      [productId: string]: {
        name: string;
        quantity: number;
        unitPrice: number;
      };
    } = {};

    items.forEach((item) => {
      const id = item.productId;
      const name = item.Product.name;
      const price = item.Product.price;

      if (!grouped[id]) {
        grouped[id] = {
          name,
          quantity: 1,
          unitPrice: price,
        };
      } else {
        grouped[id].quantity += 1;
      }
    });

    return Object.values(grouped);
  };

  const getTotalForGroupedItems = (
    groupedItems: ReturnType<typeof groupProducts>
  ) =>
    groupedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const grandTotal = invoicesUnPaid.reduce((sum, invoice) => {
    const groupedItems = groupProducts(invoice.invoiceProducts);
    return sum + getTotalForGroupedItems(groupedItems);
  }, 0);

  return (
    <div className="pb-16 max-w-4xl mx-auto p-6">
      <BackLink
        link={`/profile/invoices/${invoiceId}`}
        name="العودة الي قائمة الفواتير"
      />

      <div className="flex items-center justify-end gap-2 mt-4">
        <PayButton
          invoiceId={invoiceId}
          invoiceIds={invoicesUnPaid.map((inv) => inv.id)}
        />
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4 text-right">
        تفاصيل الفواتير غير المدفوعة
      </h2>

      <div id="invoice-print">
        {invoicesUnPaid.map((invoice) => {
          const groupedItems = groupProducts(invoice.invoiceProducts);

          return (
            <div key={invoice.id} className="mb-6 border rounded-lg shadow">
              <div className="p-3 font-semibold text-right">
                <p> التاريخ: {invoice.date ?? "غير متوفر"}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right border-t">
                  <thead>
                    <tr>
                      <th className="p-2 border">المنتج</th>
                      <th className="p-2 border">الكمية</th>
                      <th className="p-2 border">السعر الكلي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedItems.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">
                          {item.unitPrice * item.quantity} ج.م
                        </td>
                      </tr>
                    ))}
                    <tr className="font-bold ">
                      <td className="p-2 border">
                        الإجمالي في {invoice.date ?? "غير متوفر"}
                      </td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border">
                        {getTotalForGroupedItems(groupedItems)} ج.م
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-right">
          الإجمالي الكلي: <span id="total-price">{grandTotal} ج.م</span>
        </div>

        <PrintInvoiceButton />
      </div>
    </div>
  );
};

export default InvoicesUnPaidDetails;
