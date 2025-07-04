"use client";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeClosed,
  EyeIcon,
  LayoutDashboardIcon,
  Loader,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  arabicUsername: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  password: z.string().min(6, { message: "كلمة المرور مطلوبه" }),
  isAdmin: z.string(),
});

const UserFormData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      arabicUsername: "",
      password: "",
      isAdmin: "USER",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      await axios.post("/api/users", values);

      toast.success("تم حفظ المستخدم");

      form.reset({
        username: "",
        arabicUsername: "",
        password: "",
        isAdmin: "USER",
      });

      router.push("/profile/users");
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

  const options = [
    {
      id: 1,
      value: "ADMIN",
      label: "أدمن",
    },
    {
      id: 2,
      value: "USER",
      label: "مستخدم عادي",
    },
  ];

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
              <h2>البيانات الاساسية للمستخدم</h2>
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">
                اسم المستخدم باللغة الانجليزية
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="اسم المستخدم باللغة الانجليزية"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">
                اسم المستخدم باللغة العربية
              </div>

              <FormField
                control={form.control}
                name="arabicUsername"
                render={({ field }) => (
                  <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="اسم المستخدم باللغة العربية"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Lock} />
              <h2>الصلاحية و الامان</h2>
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">كلمة المرور</div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex items-center flex-row text-start space-x-3 space-y-0 rounded-md border p-4 relative">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type={isOpen ? "text" : "password"}
                        placeholder="اكتب كلمة السر لهذا المستخدم"
                      />
                    </FormControl>
                    {isOpen ? (
                      <EyeIcon
                        className="cursor-pointer"
                        onClick={toggleOpen}
                      />
                    ) : (
                      <EyeClosed
                        className="cursor-pointer"
                        onClick={toggleOpen}
                      />
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
              <div className="font-medium item-between">صلاحية المستخدم</div>
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row text-start space-x-1 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Select
                        dir="rtl"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="اختر الصلاحية..."
                            className="outline-none"
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

export default UserFormData;
