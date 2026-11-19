import { Suspense, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { type CourseDetails } from "../data/courses";
import api from "../api/client";
import CourseProgressWrapper from "../components/CourseProgress/CourseProgressWrapper";
import EditProfileForm from "../components/EditProfileForm";

import { Toaster } from "react-hot-toast";
//import Header from "../components/Header";
//import CourseProgress from "./components/CourseProgress/CourseProgress";
import CourseCard from "../components/CourseCard";
import Section from "../components/Section";
import FocusTimer from "../components/FocusTimer";
import HomeworkCard from "../components/HomeworkCard";
import LessonCard from "../components/LessonCard";
//import CourseReview from "./components/CourseReview";
import UserProfile from "../components/UserProfile";
//import StudyLogs from "./components/StudyLogs";
import StudyReminder from "../components/StudyReminder";
import "../App.css";

//import { courseDetailsData } from "./data/courses";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentDetails from "../components/AssignmentDetails";
import AssignmentDetailsSkeleton from "../components/AssignmentDetailsSkeleton";
import { assignmentsData, type Assignment } from "../data/assignments";

const fetchCourses = async (): Promise<CourseDetails[]> => {
  const response = await api.get("/api/courses/");

  if (!response.status) {
    throw new Error("Failed to fetch courses");
  }

  return response.data;
};

const fetchAssignments = async (): Promise<Assignment[]> => {
  const response = await api.get("/api/assignments");
  return response.data;
};

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

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  //const [isLoginModal, setIsLoginModal] = useState(false);

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

  const handleTurnInHomework = (hwId: number) => {
    setHomeworkList((prev) =>
      prev.map((hw) =>
        hw.id === hwId ? { ...hw, isCompleted: true, score: 11 } : hw,
      ),
    );
  };
  const [homeworkList, setHomeworkList] = useState(initialHomeworkList);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const { data: assignments = assignmentsData } = useQuery<Assignment[]>({
    queryKey: ["assignments"],
    queryFn: fetchAssignments,
  });

  const filteredCourses = data
    ? data.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const courseContent = isPending ? (
    <div className="text-gray-500">Завантажуємо курси...</div>
  ) : isError ? (
    <div className="text-rose-400">
      Помилка при завантажені курсів: {error.message}
    </div>
  ) : filteredCourses.length != 0 ? (
    filteredCourses.map((course) => (
      <CourseCard
        key={course.id}
        title={course.title}
        onSelect={() => setSelectedCourseId(course.id)}
      />
    ))
  ) : (
    <p className="text-gray-500">Курсів не знайдено.</p>
  );

  return (
    <div className="App p-4 max-w-7xl mx-auto">
      {/* Шапка студента */}

      <EditProfileForm />

      {/* Головна сітка: Сайдбар зліва + Контент справа */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Сайдбар: Єдиний акуратний блок студента + прогрес курсу + таймер */}
        <aside className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
          {/* Картка студента (UserProfile) */}
          <UserProfile />

          {/* Віджет групи та статусу з кнопкою перемикання */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 uppercase font-semibold block">
                Група
              </span>
              <span className="text-sm font-bold text-gray-800">
                {userProfile.group}
              </span>
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
          <CourseProgressWrapper id={selectedCourseId} />
          {/*<CourseProgress
            course={selectedCourse}
            onCompleteLesson={() => {
              if (selectedCourseId !== null) {
                handleCompleteLesson(selectedCourseId);
              }
            }}
          />*/}

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
            <div className="flex flex-wrap">{courseContent}</div>
          </Section>

          {/* Двоколонкова сітка: Домашні завдання зліва + Розклад занять справа */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
            {/* Секція: Мої домашні завдання */}
            <Section title="Мої домашні завдання">
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

          <Section title="Секція завдань">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col gap-3">
                {assignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    courseTitle={assignment.courseTitle}
                    issueDate={assignment.issueDate}
                    status={assignment.status}
                    isSelected={selectedAssignmentId === assignment.id}
                    onClick={() => setSelectedAssignmentId(assignment.id)}
                  />
                ))}
              </div>
              <Suspense
                key={selectedAssignmentId}
                fallback={<AssignmentDetailsSkeleton />}
              >
                <AssignmentDetails id={selectedAssignmentId} />
              </Suspense>
            </div>
          </Section>

          {/* Секція: Відгуки про курс */}
          {/* закоментовано, бо довговато перероблювати на новий функціонал
          <Section title="Відгуки про курс">
            <CourseReview initialCourseName={selectedCourse?.title} />
          </Section>

          <Section title="Історія активності">
            <StudyLogs
              courseTitle={selectedCourse?.title}
              lessonNumber={
                selectedCourse ? selectedCourse.completedModules + 1 : 1
              }
              onCompleteLesson={() => {
                if (selectedCourseId !== null) {
                  //handleCompleteLesson(selectedCourseId);
                }
              }}
            />
          </Section>
          */}
          <Section title="Нагадування про навчання">
            <StudyReminder />
          </Section>
        </main>
      </div>
    </div>
  );
}
