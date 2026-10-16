import { useEffect, useState } from "react";
import type { Assignment } from "../data/assignments";
import { assignmentsData } from "../data/assignments";

interface AssignmentDetailsProps {
  id: string | null;
}

export default function AssignmentDetails({ id }: AssignmentDetailsProps) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setAssignment(null);
      setError("");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    const timer = setTimeout(() => {
      const found = assignmentsData.find((a) => a.id === id);
      if (found) {
        setAssignment(found);
        setError("");
      } else {
        setAssignment(null);
        setError("Завдання не знайдено.");
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (!id && !isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть картку завдання зі списку, щоб переглянути деталі.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Завантаження даних завдання...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-dashed border-red-300 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!assignment) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">
          {assignment.courseTitle}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            assignment.status === "Здано"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {assignment.status}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <span className="font-semibold text-gray-900 block">Модуль:</span>
          <p className="text-gray-600">{assignment.moduleTitle}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-900 block">Опис завдання:</span>
          <p className="text-gray-600 leading-relaxed">{assignment.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100 text-xs">
          <div>
            <span className="text-gray-500 block">Дата видачі</span>
            <span className="font-semibold text-gray-800">{assignment.issueDate}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Дедлайн</span>
            <span className="font-semibold text-gray-800">{assignment.deadlineDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
