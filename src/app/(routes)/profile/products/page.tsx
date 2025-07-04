import BackLink from "@/components/BackLink";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";
import { getAllProducts } from "@/actions/products.action";

const ProductsPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  const products = await getAllProducts();

  return (
    <div className="pb-16">
      <BackLink link="/profile" name="العودة الي الملف الشخصي" />

      <DataTable columns={columns} data={products} />
      <div className=""></div>
    </div>
  );
};

export default ProductsPage;
