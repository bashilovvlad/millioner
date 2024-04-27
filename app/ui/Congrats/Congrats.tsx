import styles from "./congrats.module.css";

import { BackgroundImage } from "../BackgroundImage/BackgroundImage";
import { Button } from "../Button/Button";

interface ICongratsProps {
  money: number;
  onClick: () => void;
}

export const Congrats: React.FC<ICongratsProps> = ({ money, onClick }) => {
  return (
    <main className={styles.congrats}>
      <BackgroundImage
        image={{
          src: "/hand.svg",
          alt: "Hello my friend",
        }}
        width={624}
        height={367}
      />
      <div className={styles.textBlock}>
        <h2 className={styles.title}>Congratulations! You have won {money}!</h2>
        <Button label="Play again" onClick={onClick} />
      </div>
    </main>
  );
};
