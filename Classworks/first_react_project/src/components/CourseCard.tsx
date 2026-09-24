interface CourseCard {
  courseName: string;
  teacher: string;
  credits: number;
  isActive: boolean;
}

export default function CourseCard({
  courseName,
  teacher,
  credits,
  isActive = true,
}: CourseCard) {
  return (
    <div
      className="course-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{courseName}</h3>
      <p>Teacher: {teacher}</p>
      <p>Credits: {credits}</p>
      <div
        style={{
          color: isActive ? "green" : "red",
          display: "flex",
          fontWeight: "bold",
          justifyContent: "space-between",
        }}
      >
        {isActive ? "В процесі вивчення..." : "Курс завершено"}
      </div>
    </div>
  );
}
