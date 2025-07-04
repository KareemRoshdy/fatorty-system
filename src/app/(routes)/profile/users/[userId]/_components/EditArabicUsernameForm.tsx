"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UsernameFormProps {
  initialData: {
    arabicName: string;
  };
  userId: string;
}

const formSchema = z.object({
  arabicName: z.string().min(2, { message: "اسم المستخدم مطلوب" }),
});

const EditArabicUsernameForm = ({ initialData, userId }: UsernameFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/users/${userId}`, values);

      setIsLoading(false);
      toggleEdit();
      toast.success("تم تعديل بيانات المستخدم");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ حاول مره اخري");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100/10 rounded-md p-4 space-y-5">
      <div className="font-medium item-between">
        اسم المستخدم باللغة العربية
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>الغاء</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" /> تعديل
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-sm mt-2">{initialData.arabicName}</p>}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="arabicName"
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
                  <div className="flex items-center justify-center gap-x-2">
                    <Loader className="animate-spin" /> حفظ
                  </div>
                ) : (
                  "حفظ"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EditArabicUsernameForm;
