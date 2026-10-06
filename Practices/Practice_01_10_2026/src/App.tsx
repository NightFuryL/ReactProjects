import ProfileEditor from "./components/ProfileEditor";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Мій профіль</h1>
      </header>
      <main>
        <ProfileEditor />
      </main>
    </div>
  );
}

export default App;
