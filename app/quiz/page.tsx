"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

import styles from "./page.module.css";

import { questions } from "../lib/questions";

import { MillionaireGame } from "../lib/Game";
import { AnswerButton, MoneySlot, Congrats } from "../ui";

enum PREFIXES {
  A,
  B,
  C,
  D,
}

const game = new MillionaireGame(12, questions);

export default function Home() {
  const router = useRouter();
  const currentQuestion = game.getCurrentQuestion();

  const [money, setMoney] = useState(game.getMoney());
  const [active, setActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | number>(null);
  const [correct, setCorrect] = useState<null | number>(null);
  const [incorrect, setIncorrect] = useState<null | number>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  const steps = [
    {
      resolver: (answerIndex: number) => {
        setSelected(answerIndex);
        setWaiting(true);
        return answerIndex;
      },
      timeout: 0,
    },
    {
      resolver: (answerIndex: number) => {
        setSelected(null);

        const { isCorrect, correctAnswer, next } =
          game.checkAnswer(answerIndex);

        if (isCorrect) {
          setCorrect(answerIndex);
        } else {
          setCorrect(correctAnswer);
          setIncorrect(answerIndex);
        }

        return { isCorrect, correctAnswer, next };
      },
      timeout: 1000,
    },
    {
      resolver: (
        answerIndex: number,
        { isCorrect, next }: { isCorrect?: boolean; next: () => void }
      ) => {
        setSelected(null);
        setCorrect(null);
        setIncorrect(null);
        setWaiting(false);

        if (isCorrect) {
          next();
          setMoney(game.getMoney());
        } else {
          router.push(`/fail?win=${money}`);
          next();
          setMoney(0);
        }
      },
      timeout: 1000,
    },
  ];

  const run = async (answerIndex: number): Promise<void> => {
    let promise = Promise.resolve();

    steps.forEach((step) => {
      promise = promise.then((arg: any) => {
        return new Promise((res) => {
          setTimeout(() => {
            const result: any = step.resolver(answerIndex, arg);
            res(result);
          }, step.timeout);
        });
      });
    });
  };

  const handleClick = () => {
    game.resetGame();
    router.refresh();
  };

  const handleOpenMoney = () => {
    setActive((state) => !state);
  };

  return (
    <>
      {!currentQuestion ? (
        <Congrats money={money} onClick={handleClick} />
      ) : (
        <div className={styles.wrapper}>
          <div
            className={clsx(styles.openerOuter, active && styles.active)}
            onClick={handleOpenMoney}
          >
            <button className={styles.openerInner}></button>
          </div>
          <div className={styles.leftSide}>
            <div className={styles.mainHolder}>
              <p className={styles.question}>{currentQuestion.question}</p>
              <div className={styles.buttons}>
                {currentQuestion?.answers.map((item, i) => (
                  <AnswerButton
                    key={i}
                    prefix={PREFIXES[i]}
                    label={item}
                    onClick={() => {
                      if (!waiting) {
                        run(i);
                      }
                    }}
                    selected={selected === i}
                    correct={correct === i}
                    incorrect={incorrect === i}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={clsx(styles.rightSide, active && styles.active)}>
            <div className={styles.slotsHolder}>
              {questions.slice(0, game.getMaxquestions()).map((q, i) => (
                <MoneySlot
                  key={i}
                  active={currentQuestion.id === q.id}
                  passed={i < currentQuestion.id}
                  label={q.money}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
