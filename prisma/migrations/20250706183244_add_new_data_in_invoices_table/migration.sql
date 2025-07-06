/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "date" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_date_key" ON "Invoice"("date");
