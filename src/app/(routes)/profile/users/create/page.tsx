"use client";

import BackLink from "@/components/BackLink";
import Heading from "@/components/Heading";
import { LayoutDashboardIcon, Lock, UserPlus } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import UsernameForm from "./_components/UsernameForm";
import ArabicUsernameForm from "./_components/ArabicUsername";
import IsAdminForm from "./_components/IsAdminForm";
import PasswordForm from "./_components/PsswordForm";
import UserFormData from "./_components/UserFormData";

const CreateUserPage = () => {
  return (
    <div className="pb-16">
      <BackLink name="العودة الي جدول المستخدمين " link="/profile/users" />

      <div className="mt-10 ">
        {/* <Heading title="انشاء مستخدم جديد" icon={UserPlus} /> */}
      </div>

      <UserFormData />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboardIcon} />
            <h2>البيانات الاساسية للمستخدم</h2>
          </div>

          <UsernameForm />
          <ArabicUsernameForm />
        </div>

        <div className="">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Lock} />
            <h2>الصلاحية و الامان</h2>
          </div>

          <PasswordForm />
          <IsAdminForm />
        </div>
      </div> */}
    </div>
  );
};

export default CreateUserPage;
