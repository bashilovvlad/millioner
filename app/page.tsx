import styles from "./page.module.css";

import Link from "next/link";

import { BackgroundImage } from "./ui/BackgroundImage";

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
      <Link href="/quiz" className={styles.playButton}>
        Start
      </Link>
    </main>
  );
}
