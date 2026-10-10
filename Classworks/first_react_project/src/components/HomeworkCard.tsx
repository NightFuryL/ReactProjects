import clsx from "clsx";

export interface HomeworkCardProps {
  title: string;
  course: string;
  isCompleted: boolean;
  score?: number;
  onToggleComplete?: () => void;
}

export default function HomeworkCard({
  title,
  course,
  isCompleted,
  score,
  onToggleComplete,
}: HomeworkCardProps) {
  return (
    <div
      className={clsx("homework-card", isCompleted ? "completed" : "pending")}
    >
      <div className="hw-header">
        <h3 className="hw-title">{title}</h3>
        <span className="hw-course">{course}</span>
      </div>

      <div className="hw-status-area">
        {isCompleted ? (
          <p className="hw-score">
            Оцінка:{" "}
            {score !== undefined ? `${score}/12` : "Очікує перевірки..."}
          </p>
        ) : (
          <button
            type="button"
            className="submit-btn"
            onClick={onToggleComplete}
          >
            Здати роботу
          </button>
        )}
      </div>
    </div>
  );
}
