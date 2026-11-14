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


const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server started on port ", PORT);
});