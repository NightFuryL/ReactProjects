interface HeaderProps {
  studentName: string;
}

export default function Header({ studentName }: HeaderProps) {
  return (
    <header>
      <h2>Електронний щоденник студента</h2>
      {/*Інтерполяція рядка*/}
      <p>Вітаємо, {studentName}! Гарного навчання!</p>
    </header>
  );
}
