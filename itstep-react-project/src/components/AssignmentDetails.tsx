import { Suspense, use, useState, useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import type { Assignment } from "../data/assignments";
import { assignmentsData } from "../data/assignments";
import AssignmentDetailsSkeleton from "./AssignmentDetailsSkeleton";

const promiseMap = new Map<string, Promise<Assignment>>();

const fetchAssignmentDetails = (id: string): Promise<Assignment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const assignment = assignmentsData.find((a) => a.id === id);
      if (assignment) {
        resolve({ ...assignment });
      } else {
        reject(new Error(`Cannot find assignment with id ${id}`));
      }
    }, 1500);
  });
};

const getAssignmentPromise = (id: string): Promise<Assignment> => {
  let promise = promiseMap.get(id);
  if (!promise) {
    promise = fetchAssignmentDetails(id);
    promiseMap.set(id, promise);
  }
  return promise;
};

interface AssignmentDetailsContentProps {
  assignmentPromise: Promise<Assignment>;
}

function AssignmentDetailsContent({
  assignmentPromise,
}: AssignmentDetailsContentProps) {
  const initialAssignment = use(assignmentPromise);
  const [assignment, setAssignment] = useState<Assignment>(initialAssignment);
  const [isPending, startTransition] = useTransition();

  const [optimisticAssignment, setOptimisticAssignment] = useOptimistic(
    assignment,
    (current) => ({
      ...current,
      status: "Здано" as const,
    }),
  );

  const handleComplete = () => {
    startTransition(async () => {
      setOptimisticAssignment(assignment);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (Math.random() < 0.05) {
          throw new Error("Server error");
        }

        const updated: Assignment = {
          ...assignment,
          status: "Здано",
        };

        const target = assignmentsData.find((a) => a.id === updated.id);
        if (target) {
          target.status = "Здано";
        }

        promiseMap.set(updated.id, Promise.resolve(updated));
        setAssignment(updated);
        toast.success("Завдання успішно виконано!");
      } catch {
        toast.error("Не вдалося виконати завдання. Спробуйте ще раз.");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">
          {optimisticAssignment.courseTitle}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            optimisticAssignment.status === "Здано"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {optimisticAssignment.status}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <span className="font-semibold text-gray-900 block">Модуль:</span>
          <p className="text-gray-600">{optimisticAssignment.moduleTitle}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-900 block">Опис завдання:</span>
          <p className="text-gray-600 leading-relaxed">
            {optimisticAssignment.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100 text-xs">
          <div>
            <span className="text-gray-500 block">Дата видачі</span>
            <span className="font-semibold text-gray-800">
              {optimisticAssignment.issueDate}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">Дедлайн</span>
            <span className="font-semibold text-gray-800">
              {optimisticAssignment.deadlineDate}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="button"
            disabled={isPending || optimisticAssignment.status === "Здано"}
            onClick={handleComplete}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              optimisticAssignment.status === "Здано"
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
            } ${isPending ? "opacity-75 cursor-wait" : ""}`}
          >
            {isPending
              ? "Виконується..."
              : optimisticAssignment.status === "Здано"
                ? "Завдання виконано"
                : "Виконати завдання"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface AssignmentDetailsProps {
  id?: string | null;
  assignmentPromise?: Promise<Assignment>;
}

export default function AssignmentDetails({
  id,
  assignmentPromise,
}: AssignmentDetailsProps) {
  if (!id && !assignmentPromise) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть картку завдання зі списку, щоб переглянути деталі.</p>
      </div>
    );
  }

  const activePromise = assignmentPromise ?? getAssignmentPromise(id!);

  return (
    <Suspense key={id ?? "custom"} fallback={<AssignmentDetailsSkeleton />}>
      <AssignmentDetailsContent assignmentPromise={activePromise} />
    </Suspense>
  );
}
