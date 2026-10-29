import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Введіть e-mail")
    .email("Введіть коректну адресу e-mail"),
  password: z
    .string()
    .min(1, "Введіть пароль")
    .min(8, "Пароль має містити щонайменше 8 символів"),
});

type ILoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Відправлені дані: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-[calc(100%-2rem)] max-w-md flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Ласкаво просимо!
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Увійдіть до свого облікового запису
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
            errors.email
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
          placeholder="name@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm font-medium text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-slate-700"
        >
          Пароль
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
            errors.password
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
          placeholder="Мінімум 8 символів"
          {...register("password")}
        />
        {errors.password && (
          <p id="password-error" role="alert" className="text-sm font-medium text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Перевіряємо...
          </>
        ) : (
          "Увійти"
        )}
      </button>
    </form>
  );
}
