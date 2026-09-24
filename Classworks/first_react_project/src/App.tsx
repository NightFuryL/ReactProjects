import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
function App() {
  return (
    <div className="App">
      <Header studentName="Лев" />
      <CourseCard
        courseName="React JS"
        teacher="Володимир Юркевіч"
        credits={10}
        isActive={true}
      />
      <CourseCard
        courseName="ASP.NET Core"
        teacher="Пшеничний Олександр"
        credits={10}
        isActive={true}
      />
      <CourseCard
        courseName="Хімія"
        teacher="Професор Сидоренко"
        credits={2}
        isActive={false}
      />
    </div>
  );
}

export default App;
