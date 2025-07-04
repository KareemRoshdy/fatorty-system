"use client";

import BackLink from "@/components/BackLink";
import UserFormData from "./_components/UserFormData";

const CreateUserPage = () => {
  return (
    <div className="pb-16">
      <BackLink name="العودة الي جدول المستخدمين " link="/profile/users" />

      <UserFormData />
    </div>
  );
};

export default CreateUserPage;
