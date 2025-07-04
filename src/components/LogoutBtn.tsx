import { logoutAction } from "@/actions/auth.actions";
import { Button } from "./ui/button";

const LogoutBtn = () => {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant={"destructive"} className="cursor-pointer">
        تسجيل الخروج
      </Button>
    </form>
  );
};

export default LogoutBtn;
