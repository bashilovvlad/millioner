import styles from "./page.module.css";
import { ButtonLink } from "./ui";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2 className={styles.title}>Not found </h2>
      <ButtonLink href="/" label="Back to main" />
    </div>
  );
}
