# React & TypeScript Tasks
---
## 🗺️ Зміст (головний проєкт — itstep-react-project)
* [📌 Огляд проєкту та стек](#-огляд-проєкту-та-стек)
* [🧩 Ключові модулі та функціонал](#-ключові-модулі-та-функціонал)
* [🗂️ Файлова структура та компоненти](#-файлова-структура-та-компоненти)
* [⚙️ Запуск та налаштування проєкту](#️-запуск-та-налаштування-проєкту)
* [🌿 Робота з Git та гілками](#-робота-з-git-та-гілками-як-виконується-кожна-робота)
* [🚀 Остання влита робота](#-остання-влита-робота)

---

Репозиторій містить практичні, класні та домашні завдання з курсу ***React, TypeScript & Web Development (IT Step Academy)***.

Усі початкові завдання збережено в гілці **[`archive-branch`](https://github.com/NightFuryL/ReactProjects/tree/archive-branch)** (гілка не злита), після чого весь ключовий функціонал було централізовано, оптимізовано та об'єднано в єдиний навчальний дашборд у проєкті **[`itstep-react-project`](./itstep-react-project)**.

---

## 📌 Огляд проєкту та стек

Проєкт являє собою повноцінний інтерактивний навчальний портал студента (Educational Dashboard) з клієнтською частиною (SPA) та власним розширеним mock/dev бекендом на Node.js / Express.

### Основний технологічний стек:
* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React
* **Форми та валідація:** React Hook Form, Zod, React Select
* **Мережевий шар:** Axios (з автоматичними перехоплювачами / Interceptors)
* **Сповіщення:** React Hot Toast
* **Backend:** Node.js, Express 5, JSON Web Tokens (JWT), Cookie-Parser, CORS, Concurrently

---

## 🧩 Ключові модулі та функціонал
### Сюди винесено весь функціонал, реалізований протягом курсу:

* **🔐 Авторизація та робота з JWT (Access & Refresh tokens)**:
  * Повноцінна автентифікація через пару токенів: короткоживучий `accessToken` (15 хв) та довгоживучий `refreshToken` (1 день) у безпечних `httpOnly` cookies.
  * Автоматичний механізм ротації/оновлення токена в Axios Interceptor (`api/client.ts`) при отриманні `401 Unauthorized` без переривання взаємодії користувача.
  * Модальне вікно входу користувача (`LoginForm.tsx`).

* **👤 Профіль студента та валідація даних**:
  * Картка студента (`UserProfile.tsx`) з інформацією про групу, контакти та швидким перемикачем форми навчання (Онлайн / Офлайн).
  * Форма редагування профілю (`EditProfileForm.tsx`) із суворою перевіркою полів схемою **Zod**, інтеграцією з **React Hook Form** та кастомним мульти-вибором навичок через **React Select**.

* **📚 Курси та прогрес навчання (Courses & CourseProgress)**:
  * Каталог курсів із живим пошуком та фільтрацією за назвою чи викладачем (`CourseCard.tsx`).
  * Асинхронне підвантаження прогресу обраного курсу із захищеного API (`/api/courses/:id`) з відображенням стану завантаження через скелетони (`CourseProgressSkeleton.tsx`).

* **📝 Завдання та деталі (Assignments)**:
  * Список призначених завдань з дедлайнами та статусами («Здано» / «Не здано») у вигляді карток (`AssignmentCard.tsx`).
  * Детальний перегляд вибраного завдання (`AssignmentDetails.tsx`) з оптимізованим рендерингом за допомогою React `Suspense` та `AssignmentDetailsSkeleton.tsx`.
  * Трекер здачі домашніх робіт з миттєвим виставленням оцінки (`HomeworkCard.tsx`).

* **⏱️ Віджети продуктивності та навчання**:
  * **FocusTimer** — таймер концентрації уваги (метод Pomodoro) для фокусованої роботи над кодом.
  * **StudyReminder** — нагадування та планувальник щоденних навчальних блоків.
  * **StudyLogs** — журнал активності студента та трекінг пройдених занять.
  * **CourseReview** — компонент відгуків про навчальні курси.
  * **LessonCard** — розклад лекцій із переходом за посиланням у Zoom.

---

## 🗂️ Файлова структура та компоненти

### Структура робочої директорії [`itstep-react-project`](./itstep-react-project):

* **`src/components/`** — модульні UI-компоненти:
  * `Header.tsx`, `Section.tsx`, `UserProfile.tsx`, `LoginForm.tsx`, `EditProfileForm.tsx`
  * `CourseCard.tsx`, `CourseProgress/` (`CourseProgress.tsx`, `CourseProgressSkeleton.tsx`, `CourseProgressWrapper.tsx`)
  * `AssignmentCard.tsx`, `AssignmentDetails.tsx`, `AssignmentDetailsSkeleton.tsx`, `HomeworkCard.tsx`, `LessonCard.tsx`
  * `FocusTimer.tsx`, `StudyReminder.tsx`, `StudyLogs.tsx`, `CourseReview.tsx`
* **`src/api/`** — екземпляр Axios (`client.ts`), робота з заголовками Authorization, `withCredentials` та перехоплення 401 помилок.
* **`src/data/`** — джерела даних за замовчуванням (`courses.ts`, `assignments.ts`).
* **`server.js`** — локальний сервер Express (ендпоінти `/api/login`, `/api/refresh`, `/api/courses/:id`).

---

## ⚙️ Запуск та налаштування проєкту

Для зручності налаштовано паралельний запуск інтерфейсу та локального бекенду однією командою:

```bash
# 1. Перейдіть до папки проєкту
cd itstep-react-project

# 2. Встановіть необхідні залежності
npm install

# 3. Одночасний запуск клієнта (Vite) та сервера (Express)
npm run dev
```

> 🌐 **Локальні адреси:**
> * **Frontend (Vite):** `http://localhost:5173`
> * **Backend (Express API):** `http://localhost:3001`

### Додаткові скрипти:
* `npm run dev:front` — запуск виключно Vite dev-сервера
* `npm run dev:back` — запуск тільки сервера Express
* `npm run build` — TypeScript перевірка типів та збірка Vite
* `npm run lint` — перевірка коду ESLint

---

## 🌿 Робота з Git та гілками, як виконується кожна робота:

* Для кожного нового завдання (класної, практичної чи домашньої роботи) створюється окрема тематична гілка:
  * `Classwork-dd-mm-yyyy` (наприклад, `Classwork-05-11-2026`)
  * `HW-dd-mm-to-dd-mm-yyyy` (наприклад, `HW-29-10-to-06-11-2026`)
  * `practice-dd-mm-yyyy`
  
  *(Де `dd`, `mm` та `yyyy` — день, місяць та повний рік видачі чи виконання завдання).*
* Усі логічно завершені етапи фіксуються атомарними коммітами за конвенцією **Conventional Commits**:  
  `feat: add EditProfileForm with zod and react-hook-form`, `feat: implement jwt refresh cookie rotation in server.js`, `feat: add CourseProgressSkeleton for Suspense loading`, `chore(main): restructure project layout` тощо.
* Після перевірки та локального тестування гілка зливається в основну гілку `main`.

---

## 🚀 Остання влита робота:
### Класна робота 05.11.2026 (Клієнт-серверна архітектура та JWT авторизація)
Остання актуальна робота, що була перевірена та влита в `main`

### Підтвердження виконання (Скріншоти та результати тестування):

![Немає фото](Images/0.png)
![Немає фото](Images/0.png)
![Немає фото](Images/0.png)
