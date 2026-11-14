import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { request } from "node:http";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROFILE_FILE = path.join(__dirname, "profile.json");

const defaultProfile = {
    fullName: "Лев",
    group: "P-410",
    specialty: "Fullstack Developer",
    phone: "+380 12 345 67 89",
    email: "lvumba@gmail.com",
    city: "Одеса, Україна",
    phones: [{ number: "+380 12 345 67 89" }],
    languages: [
        { value: "uk", label: "Українська" },
        { value: "en", label: "Англійська" }
    ],
    socials: [
        { name: "GitHub", url: "https://github.com" }
    ]
};

if (!fs.existsSync(PROFILE_FILE)) {
    try {
        fs.writeFileSync(PROFILE_FILE, JSON.stringify(defaultProfile, null, 2), "utf-8");
        console.log("Файл profile.json створено з початковими даними.");
    } catch (err) {
        console.error("Не вдалося створити profile.json:", err);
    }
}

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());


// Секретні ключі для підпису токенів (у реальному житті зберігаються в .env)
const ACCESS_SECRET = 'secret-access-key';
const REFRESH_SECRET = 'secret-refresh-key';




app.post('/api/login', (req, res) => {
    const accessToken = jwt.sign({ role: 'student' }, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ role: 'student' }, REFRESH_SECRET, { expiresIn: '1d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 хвилин
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 3600 * 1000 }); // 1 день

    res.json({ accessToken, refreshToken, user: { name: 'John Doe', email: req.body.email } });
});

app.post('/api/refresh', (req, res) => {
    //const { refreshToken } = req.body;
    const refreshToken = req.cookies.refreshToken; // Отримуємо refreshToken з cookie

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Refresh token expired' });
        }
        const newAccessToken = jwt.sign({ role: 'student' }, ACCESS_SECRET, { expiresIn: '15m' });
        res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 24 * 3600 * 1000 }); // 15 хвилин
        res.json({ message: 'Access token refreshed' });
    })
})

export const courseDetailsData = [
    {
        id: "c1",
        title: "Основи HTML та CSS",
        description: "Фундаментальний курс з верстки веб-сторінок. Вивчіть семантичний HTML та сучасний CSS (Flexbox, Grid) для створення стильних та адаптивних сайтів.",
        teacher: "Олексій Іванов",
        modules: [
            { name: "Вступ до веб-технологій", isCompleted: true },
            { name: "Семантична розмітка HTML5", isCompleted: true },
            { name: "Основи стилізації", isCompleted: true },
            { name: "Системи розкладки: Flexbox та Grid", isCompleted: true },
            { name: "Адаптивний та мобільний дизайн", isCompleted: true }
        ],
        completedModules: 5
    },
    {
        id: "c2",
        title: "JavaScript Advanced",
        description: "Поглиблене вивчення JavaScript. Розбираємо під капотом замикання, прототипи, event loop та асинхронне програмування (Promises, async/await).",
        teacher: "Марія Коваленко",
        modules: [
            { name: "Просунута робота з функціями", isCompleted: true },
            { name: "Об'єктно-орієнтований JS", isCompleted: true },
            { name: "Асинхронність та Event Loop", isCompleted: true },
            { name: "Робота з мережею (Fetch API)", isCompleted: true },
            { name: "Маніпуляції з DOM-деревом", isCompleted: true }
        ],
        completedModules: 5
    },
    {
        id: "c3",
        title: "React Frontend",
        description: "Сучасна розробка інтерактивних інтерфейсів. Компонентний підхід, глибоке розуміння хуків, управління станом та життєвий цикл компонентів.",
        teacher: "Володимир Юркевич",
        modules: [
            { name: "Вступ до JSX та Компонентів", isCompleted: true },
            { name: "Локальний стан та Пропси", isCompleted: true },
            { name: "Побічні ефекти (useEffect)", isCompleted: false },
            { name: "Робота з формами", isCompleted: false },
            { name: "Маршрутизація", isCompleted: false }
        ],
        completedModules: 2
    },
    {
        id: "c4",
        title: "Програмування на C++",
        description: "Комплексний курс з C++. Від базових конструкцій до ручного керування пам'яттю, вказівників, шаблонів (templates) та роботи з контейнерами STL.",
        teacher: "Володимир Юркевич",
        modules: [
            { name: "Базовий синтаксис та типи даних", isCompleted: false },
            { name: "Вказівники та динамічна пам'ять", isCompleted: false },
            { name: "Об'єктно-орієнтоване програмування", isCompleted: false },
            { name: "Шаблони класів та функцій", isCompleted: false },
            { name: "Алгоритми та структури даних STL", isCompleted: false }
        ],
        completedModules: 0
    },
    {
        id: "c5",
        title: "Fullstack на Next.js",
        description: "Створення повноцінних веб-додатків. Використання Next.js (App Router), серверних компонентів, інтеграція з базою даних (Supabase/Prisma) та стилізація через Tailwind.",
        teacher: "Макс",
        modules: [
            { name: "Архітектура Next.js (App Router)", isCompleted: true },
            { name: "Серверні vs Клієнтські компоненти", isCompleted: true },
            { name: "Інтеграція з базою даних", isCompleted: true },
            { name: "Аутентифікація користувачів", isCompleted: false },
            { name: "Деплой та оптимізація продуктивності", isCompleted: false }
        ],
        completedModules: 3
    }
];

app.get('/api/courses', (req, res) => {
    res.json(courseDetailsData);
});

app.patch('/api/courses/:id/toggle-module', (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Немає доступу (відсутній токен)' });
    }

    jwt.verify(token, ACCESS_SECRET, (err) => {
        if (err) {
            return res.status(401).json({ message: 'Токен прострочений' });
        }

        const courseId = req.params.id;
        const { moduleName } = req.body;

        console.log('ID з URL:', courseId, 'Тип:', typeof courseId);
        console.log('Тіло запиту:', req.body);

        const targetCourse = courseDetailsData.find((c) => c.id === courseId);
        if (!targetCourse) {
            return res.status(404).json({ message: 'Курс не знайдено' });
        }

        const targetModule = targetCourse.modules.find(
            (m) => m.name === moduleName,
        );
        if (!targetModule) {
            return res.status(404).json({ message: 'Модуль не знайдено' });
        }

        targetModule.isCompleted = !targetModule.isCompleted;
        targetCourse.completedModules = targetCourse.modules.filter(
            (m) => m.isCompleted,
        ).length;

        res.json({ message: 'Статус збережено', course: targetCourse });
    });
});

app.get('/api/courses/:id', (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, ACCESS_SECRET, (err) => {
        if (err) {
            return res.status(401).json({ message: "Token expired" });
        }

        const courseId = req.params.id;
        const targetCourse = courseDetailsData.find(c => c.id == courseId);
        if (!targetCourse) return res.status(404).json({ message: "Course not found" });

        res.json(targetCourse);
    })
})

app.patch('/api/courses/:id/modules', (req, res) => {
    // 1. Логируем сам факт прихода запроса
    console.log(`Отримано PATCH-запит для курсу: ${req.params.id}`, req.body);

    const token = req.cookies.accessToken;

    if (!token) {
        console.log("Помилка: Access token відсутній в cookie");
        return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, ACCESS_SECRET, (err) => {
        if (err) {
            console.log("Помилка: Невалідний або прострочений токен");
            return res.status(401).json({ message: "Token expired" });
        }

        const courseId = req.params.id;
        const { moduleName } = req.body;

        const targetCourse = courseDetailsData.find(c => c.id == courseId);
        if (!targetCourse) {
            console.log(`Курс ${courseId} не знайдено`);
            return res.status(404).json({ message: "Course not found" });
        }

        const targetModule = targetCourse.modules.find(m => m.name === moduleName);
        if (!targetModule) {
            console.log(`Модуль "${moduleName}" не знайдено`);
            return res.status(404).json({ message: "Module not found" });
        }

        targetModule.isCompleted = !targetModule.isCompleted;
        targetCourse.completedModules = targetCourse.modules.filter(m => m.isCompleted).length;

        console.log(`Module "${moduleName}" toggled to ${targetModule.isCompleted}`);

        res.json(targetCourse);
    });
});

app.get('/api/update-profile', (req, res) => {
    if (!fs.existsSync(PROFILE_FILE)) {
        return res.status(404).json({ message: "Профіль ще не створено" });
    }

    try {
        const fileData = fs.readFileSync(PROFILE_FILE, "utf-8");
        const profile = JSON.parse(fileData);
        res.json(profile);
    } catch (err) {
        console.error("Помилка читання файлу:", err);
        res.status(500).json({ message: "Помилка при читанні файлу профілю" });
    }
});

const handleUpdateProfile = (req, res) => {
    const profileData = req.body;

    if (!profileData || typeof profileData !== "object") {
        return res.status(400).json({ message: "Дані профілю відсутні" });
    }

    const { fullName, email } = profileData;
    if (!fullName || !fullName.trim() || !email || !email.trim()) {
        return res.status(400).json({ message: "Заповніть обов'язкові поля" });
    }

    let resultData = profileData;

    try {
        if (fs.existsSync(PROFILE_FILE)) {
            const currentData = JSON.parse(fs.readFileSync(PROFILE_FILE, "utf-8"));
            resultData = { ...currentData, ...profileData };
        }

        fs.writeFileSync(PROFILE_FILE, JSON.stringify(resultData, null, 2), "utf-8");
        console.log("Профіль успішно збережено у файл profile.json");
        return res.json({ message: "Профіль успішно збережено", data: resultData });
    } catch (err) {
        console.error("Помилка при збереженні файлу:", err);
        return res.status(500).json({ message: "Помилка сервера при збереженні даних" });
    }
};

app.post('/api/update-profile', handleUpdateProfile);
app.put('/api/update-profile', handleUpdateProfile);

export let assignmentsData = [
  {
    id: "a1",
    courseTitle: "React Frontend",
    moduleTitle: "Вступ до JSX та Компонентів",
    description: "Створити компонентну структуру для каталогу товарів із використанням типізованих пропсів та умовного рендерингу.",
    issueDate: "10 Жовтня 2026",
    deadlineDate: "17 Жовтня 2026",
    status: "Здано",
  },
  {
    id: "a2",
    courseTitle: "React Frontend",
    moduleTitle: "Локальний стан та Пропси",
    description: "Реалізувати інтерактивний список завдань із можливістю фільтрації за статусом та збереженням стану в useState.",
    issueDate: "14 Жовтня 2026",
    deadlineDate: "21 Жовтня 2026",
    status: "Не здано",
  },
  {
    id: "a3",
    courseTitle: "JavaScript Advanced",
    moduleTitle: "Асинхронність та Event Loop",
    description: "Написати модуль для роботи з асинхронними запитами за допомогою Promises та async/await з обробкою помилок.",
    issueDate: "05 Жовтня 2026",
    deadlineDate: "12 Жовтня 2026",
    status: "Здано",
  },
  {
    id: "a4",
    courseTitle: "Основи HTML та CSS",
    moduleTitle: "Системи розкладки: Flexbox та Grid",
    description: "Верстка адаптивної сторінки дашборду для освітньої платформи з використанням CSS Grid та Flexbox.",
    issueDate: "01 Жовтня 2026",
    deadlineDate: "08 Жовтня 2026",
    status: "Здано",
  },
  {
    id: "a5",
    courseTitle: "Fullstack на Next.js",
    moduleTitle: "Серверні vs Клієнтські компоненти",
    description: "Розробити блог з гібридним рендерингом, оптимізацією зображень та серверною пагінацією статей.",
    issueDate: "12 Жовтня 2026",
    deadlineDate: "20 Жовтня 2026",
    status: "Не здано",
  },
  {
    id: "a6",
    courseTitle: "Програмування на C++",
    moduleTitle: "Вказівники та динамічна пам'ять",
    description: "Реалізувати власний клас динамічного масиву з глибоким копіюванням, перевантаженням операторів та семантикою переміщення.",
    issueDate: "08 Жовтня 2026",
    deadlineDate: "16 Жовтня 2026",
    status: "Не здано",
  },
];

app.get('/api/assignments', (req, res) => {
    res.json(assignmentsData);
});

app.get('/api/assignments/:id', (req, res) => {
    const assignment = assignmentsData.find(a => a.id === req.params.id);
    if (!assignment) {
        return res.status(404).json({ message: "Завдання не знайдено" });
    }
    res.json(assignment);
});

app.patch('/api/assignments/:id/toggle-status', (req, res) => {
    const { id } = req.params;
    const assignment = assignmentsData.find(a => a.id === id);

    if (!assignment) {
        return res.status(404).json({ message: "Завдання не знайдено" });
    }

    assignment.status = assignment.status === "Здано" ? "Не здано" : "Здано";
    console.log(`Статус завдання ${id} оновлено на: ${assignment.status}`);

    res.json({ message: "Статус завдання змінено", assignment });
});

app.patch('/api/assignments/:id', (req, res) => {
    const { id } = req.params;
    const assignment = assignmentsData.find(a => a.id === id);

    if (!assignment) {
        return res.status(404).json({ message: "Завдання не знайдено" });
    }

    if (req.body && req.body.status) {
        assignment.status = req.body.status;
    } else {
        assignment.status = assignment.status === "Здано" ? "Не здано" : "Здано";
    }

    res.json({ message: "Статус завдання змінено", assignment });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server started on port ", PORT);
});