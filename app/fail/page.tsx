"use client";
import styles from "./page.module.css";

import { useSearchParams } from "next/navigation";

import { BackgroundImage, ButtonLink } from "../ui";

import { useWindowSize } from "../hooks";

export default function Fail() {
  const { width = 0 } = useWindowSize();

  const searchParams = useSearchParams();

  const money = searchParams.get("win");

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
        <h1 className={styles.title}>
          You have won ${money ? money.toLocaleString() : 0}!
        </h1>
        <ButtonLink href="/quiz" label="Play again" />
      </div>
    </main>
  );
}
