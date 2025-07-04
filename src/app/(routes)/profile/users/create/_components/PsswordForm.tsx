"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(6, { message: "كلمة المرور مطلوبه" }),
});

const PasswordForm = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEdited((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="mt-6 border bg-slate-100/10 rounded-md p-4">
      <div className="font-medium item-between">
        كلمة المرور
        {/* <Button variant={"ghost"} onClick={toggleEdit}>
          {isEdited ? (
            <>الغاء</>
          ) : (
            <>
              <PencilIcon className="size-4 " /> تعديل
            </>
          )}
        </Button> */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="اكتب كلمة السر لهذا المستخدم"
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

export default PasswordForm;

// <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
//   <FormControl>
//     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//   </FormControl>
// </FormItem>;
