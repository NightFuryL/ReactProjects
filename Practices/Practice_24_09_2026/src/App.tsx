import Section from "./components/Section";
import HomeworkCard from "./components/HomeworkCard";
import "./App.css";

const homeworkList = [
  {
    id: 1,
    title: "Створення першого React додатку",
    course: "React JS",
    isCompleted: true,
    score: 11,
  },
  {
    id: 2,
    title: "Опціональні пропси та умовний рендеринг",
    course: "React JS",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Розробка REST API контролерів",
    course: "ASP.NET Core",
    isCompleted: false,
  },
];

function App() {
  return (
    <div className="practice-container">
      <header className="page-header">
        <p className="subtitle">Секція: "Мої домашні завдання"</p>
      </header>

      <main className="content">
        <Section title="Мої домашки">
          <div className="cards-list">
            {homeworkList.map((hw) => (
              <HomeworkCard
                key={hw.id}
                title={hw.title}
                course={hw.course}
                isCompleted={hw.isCompleted}
                score={hw.score}
              />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
