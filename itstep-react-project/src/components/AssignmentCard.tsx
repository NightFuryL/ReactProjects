import React from "react";
import { CheckCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";
import type { Assignment } from "../data/assignments";
import toast from "react-hot-toast";

export interface AssignmentCardProps {
  id?: string;
  courseTitle: string;
  issueDate: string;
  status?: "Здано" | "Не здано";
  isSelected?: boolean;
  onClick?: () => void;
}

export default function AssignmentCard({
  id,
  courseTitle,
  issueDate,
  status = "Не здано",
  isSelected,
  onClick,
}: AssignmentCardProps) {
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: async () => {
      if (!id) return;
      const response = await api.patch(`/api/assignments/${id}/toggle-status`);
      return response.data;
    },
    onMutate: async () => {
      if (!id) return;
      await queryClient.cancelQueries({ queryKey: ["assignments"] });
      const previousAssignments =
        queryClient.getQueryData<Assignment[]>(["assignments"]);

      queryClient.setQueryData<Assignment[]>(["assignments"], (old) => {
        if (!old) return old;
        return old.map((a) =>
          a.id === id
            ? {
                ...a,
                status:
                  a.status === "Здано"
                    ? ("Не здано" as const)
                    : ("Здано" as const),
              }
            : a,
        );
      });

      return { previousAssignments };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousAssignments) {
        queryClient.setQueryData(["assignments"], context.previousAssignments);
      }
      toast.error("Не вдалося змінити статус завдання.");
    },
    onSuccess: (data) => {
      const newStatus = data?.assignment?.status;
      if (newStatus === "Здано") {
        toast.success("Завдання успішно виконано (Здано)!");
      } else {
        toast.success("Статус змінено на 'Не здано'.");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["assignment", id] });
      }
    },
  });

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      toggleStatusMutation.mutate();
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50/60 shadow-sm ring-2 ring-blue-400"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-1">
        <h3 className="font-semibold text-gray-900 text-base">
          {courseTitle}
        </h3>
        {id && (
          <button
            type="button"
            disabled={toggleStatusMutation.isPending}
            onClick={handleToggle}
            title={
              status === "Здано"
                ? "Позначити як не здано"
                : "Позначити як здано"
            }
            className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
              status === "Здано"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
          >
            {toggleStatusMutation.isPending ? (
              <Loader2 size={13} className="animate-spin" />
            ) : status === "Здано" ? (
              <CheckCircle size={13} />
            ) : (
              <CheckCircle2 size={13} />
            )}
            <span>{status}</span>
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Дата видачі:{" "}
        <span className="font-medium text-gray-700">{issueDate}</span>
      </p>
    </div>
  );
}
