import { use, useState, useOptimistic, useTransition } from "react";
import type { CourseDetails, Module } from "../../data/courses";
import { CheckCircle, CheckCircle2 } from "lucide-react";
interface CourseProgressProps {
  coursePromise: Promise<CourseDetails>;
}

export default function CourseProgress({
  coursePromise,
  //onCompleteLesson,
}: CourseProgressProps) {
  const initialDetails = use(coursePromise);

  const [courseDetails, setCourseDetails] =
    useState<CourseDetails>(initialDetails);

  const [isPending, startTransition] = useTransition();

  const [optimisticDetails, setOptimisticDetails] = useOptimistic(
    courseDetails,
    (currentDetails, moduleName: string) => {
      const updatedModules = currentDetails.modules.map((m) =>
        m.name === moduleName ? { ...m, isCompleted: !m.isCompleted } : m,
      );

      const completedCount = updatedModules.filter((m) => m.isCompleted).length;

      return {
        ...currentDetails,
        modules: updatedModules,
        completedModules: completedCount,
      };
    },
  );

  const completedModules =
    optimisticDetails?.modules.filter((m) => m.isCompleted).length || 0;

  const progressPercentage = Math.min(
    100,
    Math.round(
      (completedModules / (optimisticDetails?.modules.length || 1)) * 100,
    ),
  );
  const handleToggleModule = async (module: Module) => {
    startTransition(async () => {
      setOptimisticDetails(module.name);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (Math.random() > 0.85) {
          throw new Error("Server error");
        }

        const updatedModules = courseDetails.modules.map((m) =>
          m.name === module.name ? { ...m, isCompleted: !m.isCompleted } : m,
        );

        setCourseDetails({
          ...courseDetails,
          modules: updatedModules,
          completedModules: updatedModules.filter((m) => m.isCompleted).length,
        });
      } catch (error) {
        alert("Не вдалося оновити статус модулю. Спробуйте ще раз.");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        📈 Прогрес курсу: {courseDetails?.title}
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <div>
            <p className="font-medium text-gray-600">
              {optimisticDetails?.description}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-600">Пройдено уроков: </span>
          <span className="font-bold text-blue-600">
            {completedModules} / {optimisticDetails?.modules.length}
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div>
          {optimisticDetails?.modules.map((m, index) => (
            <div className="flex justify-between">
              <div>
                <p>
                  <span className="font-mono">{index + 1}. </span>{" "}
                  <span className="font-bold tracking-wide">{m.name}</span>
                </p>
              </div>
              <button
                disabled={isPending}
                onClick={() => handleToggleModule(m)}
                className={`px-3 py-1 text-sm rounded-md transition-colors font-bold
                ${m.isCompleted ? "text-green-700" : "text-gray-700"}`}
              >
                {m.isCompleted ? <CheckCircle /> : <CheckCircle2 />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
