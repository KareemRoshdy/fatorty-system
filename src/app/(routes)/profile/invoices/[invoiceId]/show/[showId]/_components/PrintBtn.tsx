"use client";

import { Button } from "@/components/ui/button";

const PrintInvoiceButton = () => {
  const handlePrint = () => {
    const content = document.getElementById("invoice-print");
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!content || !printWindow) return;

    // استخرج السعر الكلي من عنصر داخل الصفحة
    const totalPriceEl =
      document.getElementById("total-price")?.innerText || "";

    printWindow.document.write(`
    <html dir="rtl">
      <head>
        <title>فاتورة</title>
        <style>
          body { font-family: 'Arial', sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: right; }
          h2 { text-align: center; margin-bottom: 20px; }
          .total { margin-top: 20px; font-size: 18px; font-weight: bold; text-align: left; }
        </style>
      </head>
      <body onload="window.print(); window.onafterprint = window.close();">
        ${content.innerHTML}
        <div class="total">السعر الكلي: ${totalPriceEl}</div>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  return (
    <div className="flex justify-end mb-4">
      <Button
        onClick={handlePrint}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        طباعة الفاتورة
      </Button>
    </div>
  );
};

export default PrintInvoiceButton;
