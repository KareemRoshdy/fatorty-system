import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceWithProductItems } from "@/types";

interface UnPaidInvoicesProps {
  unPaidInvoices: InvoiceWithProductItems[] | undefined;
}

const UnPaidInvoices = ({ unPaidInvoices }: UnPaidInvoicesProps) => {
  if (!unPaidInvoices?.length) {
    return <p className="text-gray-500">لا توجد فواتير غير مدفوعة</p>;
  }

  const groupProducts = (invoice: InvoiceWithProductItems) => {
    const productMap: Record<
      string,
      { name: string; price: number; quantity: number }
    > = {};

    invoice.invoiceProducts.forEach((item) => {
      const key = item.Product.id;
      if (!productMap[key]) {
        productMap[key] = {
          name: item.Product.name,
          price: item.Product.price,
          quantity: 1,
        };
      } else {
        productMap[key].quantity += 1;
      }
    });

    return Object.values(productMap);
  };

  // إجمالي كل الفواتير
  let grandTotal = 0;

  return (
    <div className="overflow-x-auto">
      <Table className="w-full shadow">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border">التاريخ</TableHead>
            <TableHead className="text-right border">المنتجات</TableHead>
            <TableHead className="text-center border ">الإجمالي</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {unPaidInvoices.map((invoice) => {
            const groupedProducts = groupProducts(invoice);
            const productsDisplay = groupedProducts
              .map((p) => `${p.quantity} ${p.name}`)
              .join(" + ");

            const totalPrice = groupedProducts.reduce(
              (sum, p) => sum + p.price * p.quantity,
              0
            );

            grandTotal += totalPrice;

            return (
              <TableRow key={invoice.id}>
                <TableCell className="px-4 py-2 border text-center">
                  {invoice.date ?? "-"}
                </TableCell>
                <TableCell className="py-2 border">{productsDisplay}</TableCell>
                <TableCell className=" py-2 border text-center">
                  {totalPrice.toFixed(2)} ج.م
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow className="font-semibold">
            <TableCell colSpan={2} className="px-4 py-2 border text-right">
              المجموع الكلي
            </TableCell>
            <TableCell className="py-2 border text-center">
              {grandTotal.toFixed(2)} ج.م
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UnPaidInvoices;
