import Header from "./components/Header";
import CourseProgress from "./components/CourseProgress";
import CourseCard from "./components/CourseCard";
import Section from "./components/Section";
import FocusTimer from "./components/FocusTimer";
import { useState } from "react";
const myCourses = [
  {
    id: 1,
    courseName: "HTML/CSS",
    teacher: "Володимир Юркевіч",
    credits: 10,
    isActive: false,
    completedLessons: 12,
    totalLessons: 12,
  },
  {
    id: 2,
    courseName: "React JS",
    teacher: "Володимир Юркевіч",
    credits: 20,
    isActive: true,
    completedLessons: 4,
    totalLessons: 15,
  },
  {
    id: 3,
    courseName: "ASP.NET Core",
    teacher: "Пшеничний Олександр",
    credits: 20,
    isActive: true,
    completedLessons: 12,
    totalLessons: 20,
  },
  {
    id: 4,
    courseName: "Хімія",
    teacher: "Професор Сидоренко",
    credits: 2,
    isActive: false,
    completedLessons: 12,
    totalLessons: 23,
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

  const [courses, setCourses] = useState(myCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCompleteLesson = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId && course.completedLessons < course.totalLessons
          ? { ...course, completedLessons: course.completedLessons + 1 }
          : course,
      ),
    );
  };

  return (
    <div className="App">
      <Header studentName={userProfile.name} />
      <div className="p-5 m-2 rounded-lg border-2 shadow-sm transition-all hover:shadow-md w-72">
        <p className="text-gray-600 mt-2">Група: {userProfile.group}</p>
        <p className="text-gray-600 mt-2">
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

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <aside>
          <CourseProgress
            course={selectedCourse}
            onCompleteLesson={() => {
              if (selectedCourseId !== null) {
                handleCompleteLesson(selectedCourseId);
              }
            }}
          />
          <FocusTimer />
        </aside>
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
                  {...course}
                  isSelected={selectedCourseId === course.id}
                  onSelect={() => setSelectedCourseId(course.id)}
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
    </div>
  );
}

export default App;
