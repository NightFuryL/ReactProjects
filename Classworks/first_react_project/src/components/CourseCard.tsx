import { useState } from "react";
import clsx from "clsx";
interface CourseCard {
  courseName: string;
  teacher: string;
  credits: number;
  isActive: boolean;
  completedLessons: number;
  totalLessons: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CourseCard({
  courseName,
  teacher,
  credits,
  isActive = true,
  completedLessons,
  totalLessons,
  isSelected,
  onSelect,
}: CourseCard) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={onSelect}
      className={clsx(
        "p-5 m-2 rounded-lg border-2 shadow-sm transition-all hover:shadow-md w-72",
        isActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-white",
        isSelected && "ring-4 ring-blue-400 transfrom -translate-y-1 shadow-md",
      )}
    >
      <h3 className="text-x1 font-bold text-gray-800">{courseName}</h3>
      <p className="text-x1 font-bold text-gray-800 leading-tight">
        Прогрес: {completedLessons} / {totalLessons}
      </p>
      <button className="text-blue-500 mt-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Сховати" : "Показати"}
      </button>
      {isOpen && (
        <div>
          <p className="text-gray-600 mt-2">Teacher: {teacher}</p>
          <p className="text-gray-600 mt-2">Credits: {credits}</p>
          <div
            className={clsx(
              "mt-4 font-semibold text-sm px-3 py-1 inline-block rounded-full",
              isActive
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-700",
            )}
          >
            {isActive ? "В процесі вивчення..." : "Курс завершено"}
          </div>
        </div>
      )}
    </div>
  );
}
