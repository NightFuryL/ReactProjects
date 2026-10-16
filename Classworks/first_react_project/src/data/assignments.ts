export interface Assignment {
  id: string;
  courseTitle: string;
  moduleTitle: string;
  description: string;
  issueDate: string;
  deadlineDate: string;
  status: "Здано" | "Не здано";
}

export const assignmentsData: Assignment[] = [
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
