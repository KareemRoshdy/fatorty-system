"use client";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, LayoutDashboardIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "اسم المنتج مطلوب" }),
  price: z.coerce.number().min(1, { message: "يجب أن يكون السعر أكبر من صفر" }),
});

const ProductFormData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      await axios.post("/api/products", values);

      toast.success("تم حفظ المنتج");

      form.reset({
        name: "",
        price: 0,
      });

      router.push("/profile/products");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div className="flex items-center justify-end gap-x-2">
          <Button disabled={!isValid || isSubmitting} type="submit">
            {isLoading ? (
              <div className="item-center gap-x-2">
                <Loader className="animate-spin" /> حفظ
              </div>
            ) : (
              "حفظ"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboardIcon} />
              <h2>البيانات الاساسية للمنتج</h2>
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">
                اسم المنتج باللغة العربية
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="اسم المنتج باللغة العربية"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={DollarSign} />
              <h2>القيمة المتوقعة بالجنية المصري</h2>
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">سعر المنتج</div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex items-center flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="number"
                        placeholder="سعر المنتج"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductFormData;
