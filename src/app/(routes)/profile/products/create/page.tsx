import BackLink from "@/components/BackLink";
import React from "react";
import ProductFormData from "./_components/ProductFormData";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateProductPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  return (
    <div className="pb-16">
      <BackLink name="العودة الي جدول المنتجات " link="/profile/products" />

      <ProductFormData />
    </div>
  );
};

export default CreateProductPage;
