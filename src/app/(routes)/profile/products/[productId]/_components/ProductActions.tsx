"use client";

import ConfirmModal from "@/components/modal/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductActionsProps {
  productId: string;
}

const ProductActions = ({ productId }: ProductActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/products/${productId}`);

      toast.success("تم حذف المنتج");
      router.push(`/profile/products`);
      router.refresh();
    } catch {
      toast.error("حدث خطأ حاول مره اخري");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmModal onConfirm={onDelete}>
      <Button size="sm" variant="destructive" disabled={isLoading}>
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            حذف
            <Trash className="h-4 w-4" />
          </>
        )}
      </Button>
    </ConfirmModal>
  );
};

export default ProductActions;
