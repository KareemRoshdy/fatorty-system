-- DropForeignKey
ALTER TABLE "InvoiceProduct" DROP CONSTRAINT "InvoiceProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "InvoiceProduct" ADD CONSTRAINT "InvoiceProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
