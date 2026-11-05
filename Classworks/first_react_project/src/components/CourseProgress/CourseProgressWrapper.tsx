import type { CourseDetails } from "../../data/courses";
import { courseDetailsData } from "../../data/courses";
import { Suspense, useEffect, useState } from "react";
import CourseProgress from "./CourseProgress";
import CourseProgressSkeleton from "./CourseProgressSkeleton";
import api from "@/api/client";
const fetchCourseDetails = async (id: string): Promise<CourseDetails> => {
  const response = await api.get<CourseDetails>(`/api/courses/${id}`);
  return response.data;
};

interface CourseProgressWrapperProps {
  id: string | null;
}

export default function CourseProgressWrapper({
  id,
}: CourseProgressWrapperProps) {
  const [coursePromise, setCoursePromise] =
    useState<Promise<CourseDetails> | null>(null);

  useEffect(() => {
    if (!id) {
      setCoursePromise(null);
      return;
    }
    setCoursePromise(fetchCourseDetails(id));
  }, [id]);
  if (!id || !coursePromise) {
    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
      </div>
    );
  }
  return (
    <Suspense key={id} fallback={<CourseProgressSkeleton />}>
      <CourseProgress coursePromise={coursePromise} />
    </Suspense>
  );
}
