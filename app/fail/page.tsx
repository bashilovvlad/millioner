"use client";
import styles from "./page.module.css";

import { useContext } from "react";
import { RewardContext } from "../app_context";

import { BackgroundImage, ButtonLink } from "../ui";

import { useWindowSize } from "../hooks";

export default function Fail() {
  const { width = 0 } = useWindowSize();

  const context = useContext(RewardContext);
  // eslint-disable-next-line
  const reward = context ? context.reward : 0;

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
          You have won ${reward?.toLocaleString()}!
        </h1>
        <ButtonLink href="/quiz" label="Play again" />
      </div>
    </main>
  );
}
