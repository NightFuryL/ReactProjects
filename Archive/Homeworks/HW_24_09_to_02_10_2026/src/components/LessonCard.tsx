import clsx from "clsx";

interface LessonCardProps {
  topic: string;
  date: string;
  isOnline: boolean;
  zoomLink?: string;
}

export default function LessonCard({
  topic,
  date,
  isOnline,
  zoomLink,
}: LessonCardProps) {
  return (
    <div
      className={clsx(
        "lesson-card",
        isOnline ? "lesson-online" : "lesson-offline"
      )}
    >
      <h3 className="lesson-topic">{topic}</h3>
      <p className="lesson-date">{date}</p>
      <div className="lesson-badge">
        {isOnline ? "Онлайн заняття" : "Офлайн заняття"}
      </div>

      {isOnline && zoomLink && (
        <a
          href={zoomLink}
          target="_blank"
          rel="noopener noreferrer"
          className="zoom-btn"
        >
          Підключитися до Zoom
        </a>
      )}

      {!isOnline && (
        <p className="offline-notice">
          Аудиторія 404. Не забудьте ноутбук!
        </p>
      )}
    </div>
  );
}
