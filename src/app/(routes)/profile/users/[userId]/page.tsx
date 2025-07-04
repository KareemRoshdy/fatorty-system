import { getUserById } from "@/actions/users.action";
import BackLink from "@/components/BackLink";
import UserActions from "./_components/UserActions";
import { IconBadge } from "@/components/IconBadge";
import { LayoutDashboardIcon, Lock } from "lucide-react";
import EditUsernameForm from "./_components/EditUsernameForm";
import { redirect } from "next/navigation";
import EditArabicUsernameForm from "./_components/EditArabicUsernameForm";
import EditPasswordForm from "./_components/EditPasswordForm";
import EditRoleForm from "./_components/EditRoleForm";

interface EditUserPageProps {
  params: {
    userId: string;
  };
}

const EditUserPage = async ({ params }: EditUserPageProps) => {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) redirect("/profile/users");

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between">
        <BackLink name="العودة الي جدول المستخدمين " link="/profile/users" />
        <UserActions userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboardIcon} />
            <h2>البيانات الاساسية للمستخدم</h2>
          </div>

          <EditUsernameForm userId={userId} initialData={user} />
          <EditArabicUsernameForm userId={userId} initialData={user} />
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Lock} />
            <h2>الصلاحية و الامان</h2>
          </div>

          <EditPasswordForm userId={userId} initialData={user} />
          <EditRoleForm userId={userId} initialData={{ role: user.role }} />
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
