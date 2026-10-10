import { useState, useRef } from "react";

interface StudyLogsProps {
  courseTitle?: string;
  lessonNumber?: number;
  onCompleteLesson?: () => void;
}

export default function StudyLogs({
  courseTitle = "React Frontend",
  lessonNumber = 1,
  onCompleteLesson,
}: StudyLogsProps) {
  const logsRef = useRef<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const addLog = (courseTitle: string, lessonNumber: number) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;
    const logMessage = `[${timeString}] Пройдено урок №${lessonNumber} курсу '${courseTitle}'`;
    logsRef.current.push(logMessage);
  };

  const handlePassLesson = () => {
    addLog(courseTitle, lessonNumber);
    if (onCompleteLesson) {
      onCompleteLesson();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handlePassLesson}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer"
        >
          Пройти урок ({courseTitle})
        </button>

        <button
          onClick={() => setShowLogs((prev) => !prev)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
        >
          {showLogs ? "Приховати історію логів" : "Показати історію логів"}
        </button>
      </div>

      {showLogs && (
        <div>
          {logsRef.current.length === 0 ? (
            <p className="text-sm text-gray-500">Логів ще немає.</p>
          ) : (
            <ul className="space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {logsRef.current.map((log, index) => (
                <li key={index} className="text-sm font-mono text-gray-700">
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
