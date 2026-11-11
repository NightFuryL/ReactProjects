import type { CourseDetails } from "../../data/courses";
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

interface CourseRequest {
  id: string;
  promise: Promise<CourseDetails>;
}

export default function CourseProgressWrapper({
  id,
}: CourseProgressWrapperProps) {
  const [courseRequest, setCourseRequest] = useState<CourseRequest | null>(
    null,
  );

  useEffect(() => {
    if (!id) {
      setCourseRequest(null);
      return;
    }
    setCourseRequest({ id, promise: fetchCourseDetails(id) });
  }, [id]);

  if (!id) {
    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
      </div>
    );
  }

  if (!courseRequest || courseRequest.id !== id) {
    return <CourseProgressSkeleton />;
  }

  return (
    <Suspense fallback={<CourseProgressSkeleton />}>
      {/* Добавляем key={id} сюда, чтобы при смене курса компонент монтировался заново */}
      <CourseProgress key={id} coursePromise={courseRequest.promise} />
    </Suspense>
  );
}
