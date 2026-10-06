import Section from "./components/Section";
import LessonCard from "./components/LessonCard";
import "./App.css";

const lessonsData = [
  {
    id: 1,
    topic: "Основи React та синтаксис JSX",
    date: "24 Вересня 2026, 18:30",
    isOnline: true,
    zoomLink: "https://zoom.us/j/111222333",
  },
  {
    id: 2,
    topic: "Компонентний підхід та типізація Props",
    date: "26 Вересня 2026, 18:30",
    isOnline: false,
  },
  {
    id: 3,
    topic: "Стилізація компонентів та умовний рендеринг",
    date: "29 Вересня 2026, 18:30",
    isOnline: true,
    zoomLink: "https://zoom.us/j/444555666",
  },
  {
    id: 4,
    topic: "Робота з масивами та метод .map()",
    date: "01 Жовтня 2026, 18:30",
    isOnline: false,
  },
];

function App() {
  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Електронний щоденник студента</h1>
      </header>
      <main>
        <Section title="Розклад">
          <div className="lessons-list">
            {lessonsData.map((lesson) => (
              <LessonCard
                key={lesson.id}
                topic={lesson.topic}
                date={lesson.date}
                isOnline={lesson.isOnline}
                zoomLink={lesson.zoomLink}
              />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
