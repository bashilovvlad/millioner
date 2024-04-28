"use client";
import styles from "./page.module.css";

import { BackgroundImage, ButtonLink } from "./ui";

import { useWindowSize } from "./hooks";

export default function Home() {
  const { width = 0 } = useWindowSize();

  return (
    <main className={styles.main}>
      <BackgroundImage
        image={{
          src: "/hand.svg",
          alt: "Hello my friend",
        }}
        width={width < 768 ? 290 : 630}
        height={width < 768 ? 190 : 370}
      />
      <div className={styles.income}>
        <h1 className={styles.title}>Who wants to be a millionaire?</h1>
        <ButtonLink href="/quiz" label="Start" />
      </div>
    </main>
  );
}
