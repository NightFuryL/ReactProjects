import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import Section from "./components/Section";
import { useState } from "react";
const myCourses = [
  {
    id: 1,
    courseName: "HTML/CSS",
    teacher: "Володимир Юркевіч",
    credits: 10,
    isActive: false,
  },
  {
    id: 2,
    courseName: "React JS",
    teacher: "Володимир Юркевіч",
    credits: 10,
    isActive: true,
  },
  {
    id: 3,
    courseName: "ASP.NET Core",
    teacher: "Пшеничний Олександр",
    credits: 10,
    isActive: true,
  },
  {
    id: 4,
    courseName: "Хімія",
    teacher: "Професор Сидоренко",
    credits: 2,
    isActive: false,
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "Лев",
    group: "P-410",
    isOnline: true,
  });

  const handleTransfer = () => {
    setUserProfile(() => ({
      ...userProfile,
      isOnline: !userProfile.isOnline,
    }));
  };

  const filteredCourses = myCourses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="App">
      <Header studentName={userProfile.name} />
      <div className="p-5 m-2 rounded-1g border-2 shadow-sm transition-all hover: shadow-md w-72">
        <p className="[text-gray-600 mt-2">Група: {userProfile.group}</p>
        <p className="[text-gray-600 mt-2">
          Статус :{" "}
          {userProfile.isOnline ? (
            <span className="text-green-500">Онлайн</span>
          ) : (
            <span className="text-red-500">Офлайн</span>
          )}
        </p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleTransfer}
        >
          Змінити статус
        </button>
      </div>
      <Section title="Мої курси">
        <input
          type="text"
          placeholder="Пошук курсів..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p>
          Результати пошуку для: "<strong>{searchQuery}</strong>"
        </p>
        <div
          className="course-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {filteredCourses.length != 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                courseName={course.courseName}
                teacher={course.teacher}
                credits={course.credits}
                isActive={course.isActive}
              />
            ))
          ) : (
            <p>Немає курсів, що відповідають вашому запиту.</p>
          )}
        </div>
      </Section>
      <Section title="Мої завдання">
        <p>Тут будуть домашні завдання...</p>
      </Section>
      <Section title="Мої заняття">
        <p>Тут будуть відвідані та майбутні заняття...</p>
      </Section>
    </div>
  );
}

export default App;
