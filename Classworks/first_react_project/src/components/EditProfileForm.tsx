import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";

const editProfileScheme = z.object({
  socials: z.array(
    z.object({
      name: z.string().min(1, "Назва обов'язкова"),
      url: z
        .string()
        .min(1, "Посилання обов'язкове")
        .url("Введіть коректне посилання, наприклад https://instagram.com"),
    }),
  ),
});

type IEditProfileForm = z.infer<typeof editProfileScheme>;

export default function EditProfileFrom() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IEditProfileForm>({
    resolver: zodResolver(editProfileScheme),
    defaultValues: {
      socials: [{ name: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const onSubmit: SubmitHandler<IEditProfileForm> = (data) => {
    console.log("New profile data: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Редагувати профіль
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Додайте посилання на свої соціальні мережі
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          Соціальні мережі
        </h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`social-name-${field.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Назва мережі
                  </label>
                  <input
                    type="text"
                    id={`social-name-${field.id}`}
                    placeholder="Наприклад, Instagram"
                    aria-invalid={Boolean(errors.socials?.[index]?.name)}
                    aria-describedby={
                      errors.socials?.[index]?.name
                        ? `social-name-error-${field.id}`
                        : undefined
                    }
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.socials?.[index]?.name
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    {...register(`socials.${index}.name`)}
                  />
                  {errors.socials?.[index]?.name && (
                    <p
                      id={`social-name-error-${field.id}`}
                      role="alert"
                      className="text-xs font-medium text-red-600"
                    >
                      {errors.socials[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`social-url-${field.id}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Посилання
                  </label>
                  <input
                    type="url"
                    id={`social-url-${field.id}`}
                    placeholder="https://..."
                    aria-invalid={Boolean(errors.socials?.[index]?.url)}
                    aria-describedby={
                      errors.socials?.[index]?.url
                        ? `social-url-error-${field.id}`
                        : undefined
                    }
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.socials?.[index]?.url
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    {...register(`socials.${index}.url`)}
                  />
                  {errors.socials?.[index]?.url && (
                    <p
                      id={`social-url-error-${field.id}`}
                      role="alert"
                      className="text-xs font-medium text-red-600"
                    >
                      {errors.socials[index]?.url?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label="Видалити соціальну мережу"
                  className="mt-7 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", url: "" })}
          className="self-start rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        >
          + Додати соціальну мережу
        </button>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Зберігаємо...
          </>
        ) : (
          "Зберегти зміни"
        )}
      </button>
    </form>
  );
}
