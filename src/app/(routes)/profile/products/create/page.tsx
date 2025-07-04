import BackLink from "@/components/BackLink";
import React from "react";
import ProductFormData from "./_components/ProductFormData";

const CreateProductPage = () => {
  return (
    <div className="pb-16">
      <BackLink name="العودة الي جدول المنتجات " link="/profile/products" />

      <ProductFormData />
    </div>
  );
};

export default CreateProductPage;
