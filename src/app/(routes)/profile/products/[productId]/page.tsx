import { getProductById } from "@/actions/products.action";
import BackLink from "@/components/BackLink";
import { redirect } from "next/navigation";
import ProductActions from "./_components/ProductActions";
import { IconBadge } from "@/components/IconBadge";
import { DollarSign, LayoutDashboardIcon } from "lucide-react";
import EditProductNameForm from "./_components/EditProductNameForm";
import EditProductPriceForm from "./_components/EditProductPriceForm";

interface EditProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { productId } = await params;

  const product = await getProductById(productId);

  if (!product) redirect("/profile/products");

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between">
        <BackLink name="العودة الي جدول المنتجات " link="/profile/products" />
        <ProductActions productId={productId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboardIcon} />
            <h2>البيانات الاساسية للمنتج</h2>
          </div>

          <EditProductNameForm productId={productId} initialData={product} />
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={DollarSign} />
            <h2>القيمة المتوقعة بالجنية المصري</h2>
          </div>

          <EditProductPriceForm productId={productId} initialData={product} />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
