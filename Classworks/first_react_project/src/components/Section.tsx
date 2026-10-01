import type { ReactNode } from "react";
interface SectionProps {
  title: string;
  children: ReactNode;
}
export default function Section({ title, children }: SectionProps) {
  return (
    <section
      style={{
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <h2
        style={{
          margin: "0",
          fontSize: "1.5rem",
          color: "#333",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
