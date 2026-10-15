import { useEffect, useState } from "react";

interface StudentData {
  name: string;
}

interface HeaderProps {
  id: number;
}

export default function Header({ id }: HeaderProps) {
  const [student, setStudent] = useState<null | StudentData>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setStudent(data));
  }, []);
  if (student === null) {
    return (
      <header className="bg-blue-900 text-center py-3 text-white font-bold text-2xl mb-4 ">
        <p className="text-lg tracking-wide italic">Завантаження даних...</p>
      </header>
    );
  }
  return (
    <header className="bg-blue-900 text-center py-3 text-white font-bold text-2xl mb-4 ">
      <h2 className="text-2xl font-bold tracking-wide">
        Електронний щоденник студента
      </h2>
      {/*Інтерполяція рядка*/}
      <p className="text-lg tracking-wide italic">
        Вітаємо, {student?.name || "гість"}! Гарного навчання!
      </p>
    </header>
  );
}
