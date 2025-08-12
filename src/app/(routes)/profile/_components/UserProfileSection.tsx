"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, OctagonX } from "lucide-react";
import { useState } from "react";
import IsPaidInvoices from "./IsPaidInvoices";
import UnPaidInvoices from "./UnPaidInvoices";
import { UserWithInvoicesAndProductDetails } from "@/types";

interface UserProfileSectionProps {
  userInvoices: UserWithInvoicesAndProductDetails | null;
}

const UserProfileSection = ({ userInvoices }: UserProfileSectionProps) => {
  const [showInvoicesUnPaid, setShowInvoicesUnPaid] = useState(true);

  const unPaidInvoices = userInvoices?.invoices.filter((item) => {
    if (item.isPaid === false) return item;
  });

  const isPaidInvoices = userInvoices?.invoices.filter((item) => {
    if (item.isPaid) return item;
    else return;
  });

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4 overflow-x-auto py-2 pe-5">
        <Button
          variant={showInvoicesUnPaid ? "default" : "outline"}
          onClick={() => setShowInvoicesUnPaid(true)}
        >
          <OctagonX className="size-5" />
          الفواتير الغير مدفوعة
        </Button>

        <Button
          variant={!showInvoicesUnPaid ? "default" : "outline"}
          onClick={() => setShowInvoicesUnPaid(false)}
        >
          <BadgeCheckIcon className="size-5" />
          الفواتير المدفوعة
        </Button>
      </div>

      <div className="mt-5">
        {showInvoicesUnPaid && (
          <UnPaidInvoices unPaidInvoices={unPaidInvoices} />
        )}

        {!showInvoicesUnPaid && (
          <IsPaidInvoices isPaidInvoices={isPaidInvoices} />
        )}
      </div>
    </div>
  );
};

export default UserProfileSection;
