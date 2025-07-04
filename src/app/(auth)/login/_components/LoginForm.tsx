"use client";

import { loginAction } from "@/actions/auth.actions";
import Alert from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/validation/validationSchemas";
import { LoaderIcon } from "lucide-react";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [clientError, setClientError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [serverSuccess, setServerSuccess] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = LoginSchema.safeParse({ username, password });
    if (!validation.success) {
      return setClientError(validation.error.errors[0].message);
    }

    setLoading(true);
    loginAction({ username, password })
      .then((result) => {
        if (result.success) {
          setClientError("");
          setServerError("");
          setServerSuccess(result.message);
        }

        if (!result.success) {
          setServerSuccess("");
          setServerError(result.message);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          الاسم
        </label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="الاسم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          كلمة المرور
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      {(clientError || serverError) && (
        <Alert type="error" message={clientError || serverError} />
      )}
      {serverSuccess && <Alert type="success" message={serverSuccess} />}

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={loading}
      >
        {loading ? <LoaderIcon className="animate-spin" /> : "تسجيل الدخول"}
      </Button>
    </form>
  );
};

export default LoginForm;
