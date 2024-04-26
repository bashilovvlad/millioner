import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>{children}</div>;
    </main>
  );
}
