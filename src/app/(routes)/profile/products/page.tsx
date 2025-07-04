import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const ProductsPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");
  return <div>ProductsPage</div>;
};

export default ProductsPage;
