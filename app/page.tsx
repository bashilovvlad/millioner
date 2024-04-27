import styles from "./page.module.css";

import { BackgroundImage } from "./ui/BackgroundImage";
import { ButtonLink } from "./ui";

export default function Home() {
  return (
    <main className={styles.main}>
      <BackgroundImage
        image={{
          src: "/hand.svg",
          alt: "Hello my friend",
        }}
        width={624}
        height={367}
      />
      <div className={styles.income}>
        <h1 className={styles.title}>Who wants to be a millionaire?</h1>
        <ButtonLink href="/quiz" label="Start" />
      </div>
    </main>
  );
}
