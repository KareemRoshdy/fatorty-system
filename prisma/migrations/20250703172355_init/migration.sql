-- DropForeignKey
ALTER TABLE "InvoiceProduct" DROP CONSTRAINT "InvoiceProduct_invoiceId_fkey";

-- AddForeignKey
ALTER TABLE "InvoiceProduct" ADD CONSTRAINT "InvoiceProduct_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
