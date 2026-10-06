import UserProfile from "./components/UserProfile";
import "./App.css";

const studentData = {
  fullName: "Лев",
  phone: "+380 12 345 67 89",
  email: "lvumba@gmail.com",
  city: "Одеса, Україна",
  specialty: "Fullstack Developer",
};

function App() {
  return (
    <div className="app-container">
      <header className="page-header">
        <h1>Інформація про студента</h1>
      </header>
      <main className="content">
        <UserProfile
          fullName={studentData.fullName}
          phone={studentData.phone}
          email={studentData.email}
          city={studentData.city}
          specialty={studentData.specialty}
        />
      </main>
    </div>
  );
}

export default App;
