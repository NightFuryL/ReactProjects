import { useState } from "react";
import Header from "./components/Header";
import CourseProgress from "./components/CourseProgress";
import CourseCard from "./components/CourseCard";
import Section from "./components/Section";
import FocusTimer from "./components/FocusTimer";
import HomeworkCard from "./components/HomeworkCard";
import LessonCard from "./components/LessonCard";
import CourseReview from "./components/CourseReview";
import UserProfile from "./components/UserProfile";
import StudyLogs from "./components/StudyLogs";
import "./App.css";

// Курси з класної роботи
const myCourses = [
  {
    id: 1,
    courseName: "HTML/CSS",
    teacher: "Володимир Юркевіч",
    credits: 10,
    isActive: false,
    completedLessons: 12,
    totalLessons: 12,
  },
  {
    id: 2,
    courseName: "React JS",
    teacher: "Володимир Юркевіч",
    credits: 20,
    isActive: true,
    completedLessons: 4,
    totalLessons: 15,
  },
  {
    id: 3,
    courseName: "ASP.NET Core",
    teacher: "Пшеничний Олександр",
    credits: 20,
    isActive: true,
    completedLessons: 12,
    totalLessons: 20,
  },
  {
    id: 4,
    courseName: "Хімія",
    teacher: "Професор Сидоренко",
    credits: 2,
    isActive: false,
    completedLessons: 12,
    totalLessons: 23,
  },
];

// Домашні завдання з Practice_24_09_2026
const initialHomeworkList = [
  {
    id: 1,
    title: "Створення першого React додатку",
    course: "React JS",
    isCompleted: true,
    score: 11,
  },
  {
    id: 2,
    title: "Опціональні пропси та умовний рендеринг",
    course: "React JS",
    isCompleted: true,
    score: 12,
  },
  {
    id: 3,
    title: "Розробка REST API контролерів",
    course: "ASP.NET Core",
    isCompleted: false,
  },
];

// Розклад занять з HW_24_09_to_02_10_2026
const lessonsData = [
  {
    id: 1,
    topic: "Основи React та синтаксис JSX",
    date: "24 Вересня 2026, 18:30",
    isOnline: true,
    zoomLink: "https://zoom.us/j/111222333",
  },
  {
    id: 2,
    topic: "Компонентний підхід та типізація Props",
    date: "26 Вересня 2026, 18:30",
    isOnline: false,
  },
  {
    id: 3,
    topic: "Стилізація компонентів та умовний рендеринг",
    date: "29 Вересня 2026, 18:30",
    isOnline: true,
    zoomLink: "https://zoom.us/j/444555666",
  },
  {
    id: 4,
    topic: "Робота з масивами та метод .map()",
    date: "01 Жовтня 2026, 18:30",
    isOnline: false,
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  // Профіль студента
  const [userProfile, setUserProfile] = useState({
    name: "Лев",
    group: "P-410",
    specialty: "Fullstack Developer",
    phone: "+380 12 345 67 89",
    email: "lvumba@gmail.com",
    city: "Одеса, Україна",
    isOnline: true,
  });

  const handleTransfer = () => {
    setUserProfile((prev) => ({
      ...prev,
      isOnline: !prev.isOnline,
    }));
  };

  const [courses, setCourses] = useState(myCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(2);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const [homeworkList, setHomeworkList] = useState(initialHomeworkList);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompleteLesson = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId && course.completedLessons < course.totalLessons
          ? { ...course, completedLessons: course.completedLessons + 1 }
          : course
      )
    );
  };

  const handleTurnInHomework = (hwId: number) => {
    setHomeworkList((prev) =>
      prev.map((hw) =>
        hw.id === hwId ? { ...hw, isCompleted: true, score: 11 } : hw
      )
    );
  };

  return (
    <div className="App p-4 max-w-7xl mx-auto">
      {/* Шапка студента */}
      <Header studentName={userProfile.name} />

      {/* Головна сітка: Сайдбар зліва + Контент справа */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Сайдбар: Єдиний акуратний блок студента + прогрес курсу + таймер */}
        <aside className="w-full lg:w-80 flex flex-col gap-4 flex-shrink-0">
          {/* Картка студента (UserProfile) */}
          <UserProfile
            fullName={userProfile.name}
            phone={userProfile.phone}
            email={userProfile.email}
            city={userProfile.city}
            specialty={userProfile.specialty}
          />

          {/* Віджет групи та статусу з кнопкою перемикання */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 uppercase font-semibold block">Група</span>
              <span className="text-sm font-bold text-gray-800">{userProfile.group}</span>
            </div>
            <div className="text-right">
              <button
                onClick={handleTransfer}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  userProfile.isOnline
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                ● {userProfile.isOnline ? "Онлайн" : "Офлайн"} (змінити)
              </button>
            </div>
          </div>

          {/* Прогрес обраного курсу */}
          <CourseProgress
            course={selectedCourse}
            onCompleteLesson={() => {
              if (selectedCourseId !== null) {
                handleCompleteLesson(selectedCourseId);
              }
            }}
          />

          {/* Таймер фокусування */}
          <FocusTimer />
        </aside>

        {/* Основний робочий простір */}
        <main className="flex-1 flex flex-col gap-6 w-full min-w-0">
          {/* Секція: Мої курси */}
          <Section title="Мої курси">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <input
                type="text"
                placeholder="Пошук курсів або викладача..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-sm px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
              />
              {searchQuery && (
                <span className="text-xs text-gray-500">
                  Знайдено курсів: <strong>{filteredCourses.length}</strong>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {filteredCourses.length !== 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    isSelected={selectedCourseId === course.id}
                    onSelect={() => setSelectedCourseId(course.id)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm py-2">
                  Немає курсів, що відповідають вашому запиту.
                </p>
              )}
            </div>
          </Section>

          {/* Двоколонкова сітка: Домашні завдання зліва + Розклад занять справа */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
            {/* Секція: Мої завдання */}
            <Section title="Мої завдання">
              <div className="cards-list">
                {homeworkList.map((hw) => (
                  <HomeworkCard
                    key={hw.id}
                    title={hw.title}
                    course={hw.course}
                    isCompleted={hw.isCompleted}
                    score={hw.score}
                    onToggleComplete={() => handleTurnInHomework(hw.id)}
                  />
                ))}
              </div>
            </Section>

            {/* Секція: Мої заняття */}
            <Section title="Мої заняття (Розклад)">
              <div className="lessons-list">
                {lessonsData.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    topic={lesson.topic}
                    date={lesson.date}
                    isOnline={lesson.isOnline}
                    zoomLink={lesson.zoomLink}
                  />
                ))}
              </div>
            </Section>
          </div>

          {/* Секція: Відгуки про курс */}
          <Section title="Відгуки про курс">
            <CourseReview initialCourseName={selectedCourse?.courseName} />
          </Section>

          <Section title="Історія активності">
            <StudyLogs
              courseTitle={selectedCourse?.courseName}
              lessonNumber={selectedCourse ? selectedCourse.completedLessons + 1 : 1}
              onCompleteLesson={() => {
                if (selectedCourseId !== null) {
                  handleCompleteLesson(selectedCourseId);
                }
              }}
            />
          </Section>
        </main>
      </div>
    </div>
  );
}

export default App;
