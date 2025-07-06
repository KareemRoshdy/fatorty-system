import { Invoice, User } from "@prisma/client";

export type InvoiceWithUser = Invoice & {
  user: {
    id: string;
    username: string;
    arabicName: string;
  };
};

export type UserWithInvoices = User & {
  invoices: Invoice[];
};
