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
  * Повноцінна автентифікація через пару токенів: короткоживучий `accessToken` та довгоживучий `refreshToken` у безпечних `httpOnly` cookies.
  * Автоматичний механізм ротації/оновлення токена в Axios Interceptor при отриманні `401 Unauthorized` без переривання взаємодії користувача.
  * Модальне вікно входу користувача.

* **👤 Профіль студента та валідація даних**:
  * Картка студента з інформацією про групу, контакти та швидким перемикачем форми навчання (Онлайн / Офлайн).
  * Форма редагування профілю із суворою перевіркою полів схемою **Zod**, інтеграцією з **React Hook Form** та кастомним мульти-вибором навичок через **React Select**.

* **📚 Курси та прогрес навчання (Courses & CourseProgress)**:
  * Каталог курсів із живим пошуком та фільтрацією за назвою чи викладачем .
  * Асинхронне підвантаження прогресу обраного курсу із захищеного API  з відображенням стану завантаження через скелетони.

* **📝 Завдання та деталі (Assignments)**:
  * Список призначених завдань з дедлайнами та статусами («Здано» / «Не здано») у вигляді карток.
  * Детальний перегляд вибраного завдання з оптимізованим рендерингом за допомогою React `Suspense` та `AssignmentDetailsSkeleton.tsx`.
  * Трекер здачі домашніх робіт з миттєвим виставленням оцінки.

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
* **`src/api/`** — екземпляр Axios, робота з заголовками Authorization, `withCredentials` та перехоплення 401 помилок.
* **`src/data/`** — джерела даних за замовчуванням.
* **`server.js`** — локальний сервер Express.

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
  `feat(<гілка_роботи>): add EditProfileForm with zod and react-hook-form`, `feat(<гілка_роботи>): implement jwt refresh cookie rotation in server.js`, `feat(<гілка_роботи>): add CourseProgressSkeleton for Suspense loading`, `chore(main): restructure project layout` тощо. Де замість <гілка_роботи> буде вставлено назву гілки, де була реалізована робота.
* Після перевірки та локального тестування гілка зливається в основну гілку `main` із коміт-merge`а у вигляді "Type dd.mm.yyyy", наприклад "Classwork 12.05.2026".

---

## 🚀 Остання робота
### 19 листопада 2026 — авторизація, маршрутизація та каталог курсів

Сьогоднішні зміни об'єднують інтерфейс дашборда, авторизацію та пошук курсів у цілісний застосунок.

#### 🔐 Авторизація та маршрутизація
* Налаштовано маршрути для головної сторінки, входу, захищеного дашборда та каталогу курсів у [router.tsx](./itstep-react-project/src/router.tsx).
* Додано спільний макет з навігацією та місцем для вкладених сторінок у [MainLayout.tsx](./itstep-react-project/src/layouts/MainLayout.tsx).
* Розділено доступ до публічних і захищених сторінок за допомогою [PublicRoute.tsx](./itstep-react-project/src/components/PublicRoute.tsx), [ProtectedRoute.tsx](./itstep-react-project/src/components/ProtectedRoute.tsx) та перевірки поточного користувача в [useAuth.tsx](./itstep-react-project/src/hooks/useAuth.tsx).
* Підключено сторінки привітання та входу: [HomePage.tsx](./itstep-react-project/src/pages/HomePage.tsx), [LoginPage.tsx](./itstep-react-project/src/pages/LoginPage.tsx) і [LoginForm.tsx](./itstep-react-project/src/components/LoginForm.tsx).
* Винесено запуск роутера в [main.tsx](./itstep-react-project/src/main.tsx), а навігацію до дашборда й каталогу — у [Header.tsx](./itstep-react-project/src/components/Header.tsx).

#### 📚 Дашборд і каталог курсів
* Основний інтерфейс винесено зі [старого App.tsx](./itstep-react-project/src/App.tsx) в окрему [DashboardPage.tsx](./itstep-react-project/src/pages/DashboardPage.tsx).
* Додано сторінку пошуку курсів із debounce-введенням, синхронізацією запиту з URL та відображенням станів завантаження й помилок у [CoursesSearchPage.tsx](./itstep-react-project/src/pages/CoursesSearchPage.tsx).
* Розширено локальний Express API: логіка входу та оновлення токенів, дані курсів і пошук курсів обробляються в [server.js](./itstep-react-project/server.js); локальні дані зберігаються в [courses.json](./itstep-react-project/courses.json).
* Налаштовано Vite proxy для API та alias `@` у [vite.config.ts](./itstep-react-project/vite.config.ts).

#### ✅ Перевірка
* `npm run build` — збірка пройшла успішно.


### Підтвердження виконання (Скріншоти та результати тестування) для домашньої чи практичної роботи: