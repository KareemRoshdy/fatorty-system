"use client";

import { markInvoicesAsPaid } from "@/actions/invoices.action"; // هتعملها كمان تحت
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PayButtonProps {
  invoiceIds: string[];
  invoiceId: string;
}

const PayButton = ({ invoiceIds, invoiceId }: PayButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await markInvoicesAsPaid(invoiceIds);
        router.push(`/profile/invoices/${invoiceId}`);
      } catch (error) {
        console.error("فشل تأكيد الدفع", error);
      }
    });
  };

  return (
    <Button
      className="block mr-auto bg-green-600 hover:bg-green-700"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "جاري التأكيد..." : "تأكيد دفع كل الفواتير"}
    </Button>
  );
};

export default PayButton;
