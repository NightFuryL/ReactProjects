interface CourseCard {
  courseName: string;
  teacher: string;
  credits: number;
}

export default function CourseCard({
  courseName,
  teacher,
  credits,
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
    </div>
  );
}
