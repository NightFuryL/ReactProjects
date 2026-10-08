import { useState } from "react";

interface CourseType {
  id: number | string;
  courseName?: string;
  title?: string;
  completedLessons: number;
  totalLessons: number;
}

interface CourseProgressProps {
  course?: CourseType;
  onCompleteLesson?: () => void;
}

export default function CourseProgress({
  course,
  onCompleteLesson,
}: CourseProgressProps) {
  const [lastActivity, setLastActivity] = useState("Курс не розпочато");

  if (!course) {
    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
      </div>
    );
  }

  const progressPercentage = Math.min(
    100,
    Math.round((course.completedLessons / course.totalLessons) * 100),
  );

  const handleComplete = () => {
    if (course.completedLessons >= course.totalLessons) return;
    if (onCompleteLesson) {
      onCompleteLesson();
      const currentTime = new Date().toLocaleTimeString("uk-UA");
      setLastActivity(`Оновлено ${currentTime}`);
    }
  };

  const courseDisplayName = course.courseName || course.title;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        📈 Прогрес курсу: {courseDisplayName}
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-600">Пройдено уроків: </span>
            <span className="font-bold text-blue-600">
              {course.completedLessons} / {course.totalLessons}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium">Наступна тема: </span>
            {course.completedLessons >= course.totalLessons
              ? "Всі теми пройдено"
              : `Урок ${course.completedLessons + 1}`}
          </p>
          <p>
            <span className="font-medium">Остання активність: </span>
            {lastActivity}
          </p>
        </div>
      </div>

      <button
        onClick={handleComplete}
        disabled={course.completedLessons >= course.totalLessons}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        {course.completedLessons >= course.totalLessons
          ? "Курс завершено"
          : "Позначити урок пройденим"}
      </button>
    </div>
  );
}
