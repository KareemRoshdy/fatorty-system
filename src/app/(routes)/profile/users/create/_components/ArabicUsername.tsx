"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  arabicUsername: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  password: z.string().min(6, { message: "كلمة المرور مطلوبه" }),
  isAdmin: z.boolean(),
});

const ArabicUsernameForm = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEdited((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arabicUsername: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="mt-6 border bg-slate-100/10 rounded-md p-4">
      <div className="font-medium item-between">
        اسم المستخدم باللغة العربية
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

          <div className="flex items-center gap-x-2">
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
        </form>
      </Form>
    </div>
  );
};

export default ArabicUsernameForm;

// <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
//   <FormControl>
//     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//   </FormControl>
// </FormItem>;
