import Section from "./components/Section";
import CourseReview from "./components/CourseReview";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Відгуки</h1>
      </header>
      <main>
        <Section title="Відгуки про курс">
          <CourseReview />
        </Section>
      </main>
    </div>
  );
}

export default App;
