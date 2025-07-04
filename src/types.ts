import { Invoice } from "@prisma/client";

export type InvoiceWithUser = Invoice & {
  user: {
    id: string;
    username: string;
    arabicName: string;
  };
};
