interface AssignmentCardProps {
  courseTitle: string;
  issueDate: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function AssignmentCard({
  courseTitle,
  issueDate,
  isSelected,
  onClick,
}: AssignmentCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50/60 shadow-sm ring-2 ring-blue-400"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <h3 className="font-semibold text-gray-900 text-base mb-1">
        {courseTitle}
      </h3>
      <p className="text-xs text-gray-500">
        Дата видачі: <span className="font-medium text-gray-700">{issueDate}</span>
      </p>
    </div>
  );
}
