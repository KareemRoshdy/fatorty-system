import z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(2, { message: "اسم المستخدم مطلوب" }),
  password: z
    .string()
    .min(6, { message: "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل" }),
});
