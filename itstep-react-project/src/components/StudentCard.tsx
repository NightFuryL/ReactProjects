function StudentCard() {
  return (
    <div
      style={{
        width: "20%",
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Student: John Doe </h3>
      <p>Course: Computer Science</p>
      <button
        style={{
          backgroundColor: "#2f2f2f",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Rate
      </button>
    </div>
  );
}

export default StudentCard;
