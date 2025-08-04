import { Invoice, InvoiceProduct, Product, User } from "@prisma/client";

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

export type InvoiceWithProducts = Invoice & {
  invoiceProducts: {
    id: string;
    productId: string;
    invoiceId: string;
    createdAt: Date;
  }[];
};

export type InvoiceWithProductItems = Invoice & {
  invoiceProducts: (InvoiceProduct & {
    Product: Product;
  })[];
};
