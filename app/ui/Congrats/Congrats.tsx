import styles from "./congrats.module.css";

import { BackgroundImage } from "../BackgroundImage/BackgroundImage";
import { Button } from "../Button/Button";

import { useWindowSize } from "../../hooks";

interface ICongratsProps {
  money: number;
  onClick: () => void;
}

export const Congrats: React.FC<ICongratsProps> = ({ money, onClick }) => {
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
        <h2 className={styles.title}>Congratulations! You have won {money}!</h2>
        <Button label="Play again" onClick={onClick} />
      </div>
    </main>
  );
};
