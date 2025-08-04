"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Box, Loader, PlusCircle, Timer, Trash } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { formatePrice } from "@/lib/formatPrice";

interface InvoiceFormDataProps {
  products: Product[];
  userId: string;
  isPaid?: boolean;
  initialData?: {
    id: string;
    date: string;
    products: string[];
  };
}

const formSchema = z.object({
  date: z.string().min(2, { message: "الوقت مطلوب" }),
  products: z
    .array(z.string().min(1, { message: "اختيار المنتج مطلوب" }))
    .min(1, { message: "يجب اختيار منتج واحد على الأقل" }),
});

const InvoiceFormData = ({
  products,
  userId,
  initialData,
  isPaid,
}: InvoiceFormDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      date: "",
      products: [],
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setSelectedProducts(initialData.products); // ← جهز القيم المبدئية
    }
  }, [initialData]);

  useEffect(() => {
    form.setValue(
      "products",
      selectedProducts.filter((id) => id)
    );
  }, [selectedProducts, form]);

  const getTotalPrice = (productIds: string[]) => {
    return productIds.reduce((sum, id) => {
      const product = products.find((p) => p.id === id);
      return product ? sum + product.price : sum;
    }, 0);
  };

  const totalPrice = getTotalPrice(selectedProducts);
  const formatted = formatePrice(totalPrice);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initialData) {
        // تعديل
        await axios.put(`/api/invoices/${initialData.id}`, {
          ...values,
          userId,
          totalPrice,
        });
        toast.success("تم تعديل الفاتورة");
      } else {
        // إضافة
        await axios.post("/api/invoices", {
          ...values,
          userId,
          totalPrice,
        });
        toast.success("تم حفظ الفاتورة");
      }

      form.reset({
        date: "",
        products: [],
      });

      router.push(`/profile/invoices/${userId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "حدث خطأ في الطلب");
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [isPricePaid, setIsPricePaid] = useState(isPaid ?? false);
  const [isToggling, setIsToggling] = useState(false);

  const togglePayment = async () => {
    try {
      setIsToggling(true);
      const response = await axios.patch(
        `/api/invoices/${initialData?.id}/toggle-payment`
      );
      setIsPricePaid(response.data.isPaid); // حدّث الحالة محلياً
      toast.success(
        `تم ${response.data.isPaid ? "تأكيد الدفع" : "إلغاء الدفع"}`
      );
      router.refresh();
    } catch {
      toast.error("فشل تعديل حالة الدفع");
    } finally {
      setIsToggling(false); // انتهاء اللودينج
    }
  };

  const [deleting, setDeleting] = useState(false);

  const deleteInvoice = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/invoices/${initialData?.id}`);
      toast.success("تم حذف الفاتورة");
      router.push(`/profile/invoices/${userId}`);
    } catch {
      toast.error("فشل حذف الفاتورة");
    } finally {
      setDeleting(false); // انتهاء اللودينج
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex items-center justify-between gap-x-2">
          <p className="p-2 bg-primary/10 rounded-md text-primary">
            السعر الكلي: {formatted}
          </p>

          <div className="item-center gap-2">
            {initialData && (
              <Button
                type="button"
                disabled={isToggling}
                variant={isPricePaid ? "destructive" : "outline"}
                onClick={togglePayment}
              >
                {isToggling ? (
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    جاري التحديث
                  </div>
                ) : isPricePaid ? (
                  "إلغاء الدفع"
                ) : (
                  "تأكيد الدفع"
                )}
              </Button>
            )}

            <Button disabled={!isValid || isSubmitting} type="submit">
              {isLoading ? (
                <div className="item-center gap-x-2">
                  <Loader className="animate-spin" />{" "}
                  {initialData ? "يتم التعديل..." : "يتم الحفظ..."}
                </div>
              ) : initialData ? (
                "تعديل"
              ) : (
                "حفظ"
              )}
            </Button>

            {initialData && (
              <Button
                onClick={deleteInvoice}
                variant="destructive"
                type="button"
              >
                {deleting ? <Loader className="animate-spin" /> : <Trash />}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Timer} />
              <h2>تاريخ انشاء الفاتورة</h2>
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">اضف التاريخ</div>

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        disabled={isSubmitting}
                        placeholder="تاريخ الفاتورة"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Box} />
              <h2>اضف المنتجات</h2>
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="font-medium item-between">اضف المنتجات</div>

                <Button
                  variant="ghost"
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => setSelectedProducts((prev) => [...prev, ""])}
                >
                  <PlusCircle />
                  <span>أضف منتج جديد</span>
                </Button>
              </div>

              {selectedProducts.map((value, index) => (
                <FormItem
                  key={index}
                  className="flex flex-row text-start space-y-0 rounded-md border p-4"
                >
                  <FormControl>
                    <Select
                      dir="rtl"
                      value={value}
                      onValueChange={(newValue) => {
                        const updated = [...selectedProducts];
                        updated[index] = newValue;
                        setSelectedProducts(updated);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر المنتج..." />
                      </SelectTrigger>

                      <SelectContent>
                        {products.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name} : {formatePrice(option.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      setSelectedProducts((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <Trash />
                  </Button>
                </FormItem>
              ))}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceFormData;
