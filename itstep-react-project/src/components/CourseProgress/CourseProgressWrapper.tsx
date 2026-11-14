import { Suspense } from "react";

import CourseProgress from "./CourseProgress";
import CourseProgressSkeleton from "./CourseProgressSkeleton";

interface CourseProgressWrapperProps {
  id: string | null;
}

export default function CourseProgressWrapper({
  id,
}: CourseProgressWrapperProps) {
  if (!id) {
    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-dashed border-gray-300 text-center text-gray-500">
        <p>Оберіть курс зі списку, щоб переглянути детальний прогрес.</p>
      </div>
    );
  }

  return (
    <Suspense key={id} fallback={<CourseProgressSkeleton />}>
      <CourseProgress courseId={id} />
    </Suspense>
  );
}
