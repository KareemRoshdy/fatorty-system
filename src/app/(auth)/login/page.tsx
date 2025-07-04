import { auth } from "@/lib/auth";
import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="h-[calc(100vh-200px)] w-full item-center">
      <section className="w-full h-full">
        <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-card shadow-md rounded-lg border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                قم بتسجيل الدخول الي حسابك
              </h1>

              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
