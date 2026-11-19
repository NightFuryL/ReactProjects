import { CheckCircle, CheckCircle2 } from "lucide-react";

import type { CourseDetails } from "../../data/courses";
import api from "../../api/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const fetchCourseDetails = async (courseId: string): Promise<CourseDetails> => {
  const response = await api.get(`/api/courses/${courseId}`);

  if (!response.status) {
    throw new Error("Failed to fetch course details.");
  }

  return response.data;
};

interface CourseProgressProps {
  courseId: string;
}
export default function CourseProgress({ courseId }: CourseProgressProps) {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ["courses", courseId],
    queryFn: () => fetchCourseDetails(courseId),
  });

  const toggleModuleMutation = useMutation({
    mutationFn: async (moduleName) => {
      await api.patch(`/api/courses/${courseId}/toggle-module`, {
        moduleName: moduleName,
      });
    },
    onMutate: async (moduleName: string) => {
      await queryClient.cancelQueries({ queryKey: ["courses", courseId] });
      const prevDetails = queryClient.getQueryData<CourseDetails>([
        "courses",
        courseId,
      ]);

      queryClient.setQueryData<CourseDetails>(["courses", courseId], (old) => {
        if (!old) return old;

        const updatedModules = old.modules.map((m) =>
          m.name === moduleName ? { ...m, isCompleted: !m.isCompleted } : m,
        );

        const completedCount = updatedModules.filter(
          (m) => m.isCompleted,
        ).length;

        return {
          ...old,
          modules: updatedModules,
          completedModules: completedCount,
        };
      });

      return { prevDetails };
    },
    onError: (_error, _moduleName, context) => {
      if (context?.prevDetails) {
        queryClient.setQueryData<CourseDetails>(
          ["courses", courseId],
          context.prevDetails,
        );
      }
      alert(`Не вдалось оновити стан модуля. Спробуйте ще раз.`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
    },
  });

  const completedModules =
    data?.modules.filter((m) => m.isCompleted).length || 0;

  const progressPercentage = Math.min(
    100,
    Math.round((completedModules / (data?.modules.length || 1)) * 100),
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-width-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        📈 Прогрес курсу: {data?.title}
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <div>
            <p className="font-medium text-gray-600">{data?.description}</p>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-600">Пройдено уроків: </span>
            <span className="font-bold text-blue-600">
              {completedModules} / {data?.modules.length}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          {data?.modules.map((m, index) => {
            const isModulePending =
              toggleModuleMutation.isPending &&
              toggleModuleMutation.variables === m.name;

            return (
              <div key={m.name} className="flex justify-between">
                <div>
                  <span className="font-mono">{index + 1}.</span>{" "}
                  <span className="font-bold tracking-wide">{m.name}</span>
                </div>

                <button
                  disabled={isModulePending}
                  onClick={() => toggleModuleMutation.mutate(m.name)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    m.isCompleted ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {m.isCompleted ? <CheckCircle /> : <CheckCircle2 />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
