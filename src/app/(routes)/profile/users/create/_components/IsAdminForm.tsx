"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  isAdmin: z.string(),
});

const IsAdminForm = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEdited((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAdmin: "USER",
    },
  });
  const { isSubmitting, isValid } = form.formState;

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="mt-6 border bg-slate-100/10 rounded-md p-4">
      <div className="font-medium item-between">
        صلاحية المستخدم [ادمن, مستخدم عادي]
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

export default IsAdminForm;

// <FormItem className="flex flex-row text-start space-x-3 space-y-0 rounded-md border p-4">
//   <FormControl>
//     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//   </FormControl>
// </FormItem>;
