import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="section-container">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}
