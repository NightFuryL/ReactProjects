import {
  useForm,
  type SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import Select from "react-select";

const languageOptions = [
  { value: "uk", label: "Українська" },
  { value: "en", label: "Англійська" },
  { value: "de", label: "Німецька" },
  { value: "pl", label: "Польська" },
  { value: "fr", label: "Французька" },
  { value: "es", label: "Іспанська" },
];

const editProfileScheme = z.object({
  fullName: z.string().min(1, "ПІБ обов'язкове"),
  email: z
    .string()
    .min(1, "Електронна пошта обов'язкова")
    .email("Введіть коректну електронну пошту"),
  phones: z.array(
    z.object({
      number: z.string().min(1, "Номер телефону обов'язковий"),
    }),
  ),
  languages: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, "Оберіть хоча б одну мову"),
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

export default function EditProfileForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IEditProfileForm>({
    resolver: zodResolver(editProfileScheme),
    defaultValues: {
      fullName: "",
      email: "",
      phones: [{ number: "" }],
      languages: [],
      socials: [{ name: "", url: "" }],
    },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
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
          Оновіть інформацію свого профілю
        </p>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="student-fullname"
            className="text-sm font-medium text-slate-700"
          >
            ПІБ студента
          </label>
          <input
            type="text"
            id="student-fullname"
            placeholder="Шевченко Тарас Григорович"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? "student-fullname-error" : undefined
            }
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              errors.fullName
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id="student-fullname-error"
              role="alert"
              className="text-xs font-medium text-red-600"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="student-email"
            className="text-sm font-medium text-slate-700"
          >
            Електронна пошта студента
          </label>
          <input
            type="email"
            id="student-email"
            placeholder="student@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "student-email-error" : undefined}
            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="student-email-error"
              role="alert"
              className="text-xs font-medium text-red-600"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
          Номери телефонів
        </h3>
        {phoneFields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor={`phone-${field.id}`}
                className="text-sm font-medium text-slate-700"
              >
                Номер телефону {index + 1}
              </label>
              <input
                type="tel"
                id={`phone-${field.id}`}
                placeholder="+380..."
                aria-invalid={Boolean(errors.phones?.[index]?.number)}
                aria-describedby={
                  errors.phones?.[index]?.number
                    ? `phone-error-${field.id}`
                    : undefined
                }
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                  errors.phones?.[index]?.number
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
                {...register(`phones.${index}.number`)}
              />
              {errors.phones?.[index]?.number && (
                <p
                  id={`phone-error-${field.id}`}
                  role="alert"
                  className="text-xs font-medium text-red-600"
                >
                  {errors.phones[index]?.number?.message}
                </p>
              )}
            </div>

            {phoneFields.length > 1 && (
              <button
                type="button"
                onClick={() => removePhone(index)}
                aria-label="Видалити номер телефону"
                className="mt-7 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendPhone({ number: "" })}
          className="self-start rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
        >
          + Додати номер телефону
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="student-languages"
          className="text-sm font-medium text-slate-700"
        >
          Володіння мовами
        </label>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              inputId="student-languages"
              isMulti
              options={languageOptions}
              placeholder="Оберіть мови..."
              noOptionsMessage={() => "Мову не знайдено"}
              className="text-sm"
            />
          )}
        />
        {errors.languages && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {errors.languages.message}
          </p>
        )}
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
