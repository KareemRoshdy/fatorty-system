"use client";

import BackLink from "@/components/BackLink";
import UserFormData from "./_components/UserFormData";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateUserPage = async () => {
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ADMIN") return redirect("/profile");

  return (
    <div className="pb-16">
      <BackLink name="العودة الي جدول المستخدمين " link="/profile/users" />

      <UserFormData />
    </div>
  );
};

export default CreateUserPage;
