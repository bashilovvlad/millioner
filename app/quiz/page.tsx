"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { AnswerButton } from "../ui";
import { questions } from "../lib/questions";

import { MillionaireGame } from "../lib/Game";
import { MoneySlot } from "../ui/MoneySlot";
import { Congrats } from "../ui/Congrats";

enum PREFIXES {
  A,
  B,
  C,
  D,
}

const game = new MillionaireGame(12, questions);

export default function Home() {
  const router = useRouter();
  const [money, setMoney] = useState(game.getMoney());
  const currentQuestion = game.getCurrentQuestion();

  const [selected, setSelected] = useState<null | number>(null);
  const [correct, setCorrect] = useState<null | number>(null);
  const [incorrect, setIncorrect] = useState<null | number>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  const arr = [
    {
      cb: (answerIndex: number) => {
        setSelected(answerIndex);
        setWaiting(true);
        return answerIndex;
      },
      timeout: 0,
    },
    {
      cb: (answerIndex: number) => {
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
      cb: (
        answerIndex: number,
        {
          isCorrect,
          correctAnswer,
          next,
        }: { isCorrect: boolean; correctAnswer: number; next: () => void }
      ) => {
        setSelected(null);
        setCorrect(null);
        setIncorrect(null);
        setWaiting(false);

        if (isCorrect) {
          next();
          setMoney(game.getMoney());
        } else {
          router.refresh();
          next();
          setMoney(0);
        }
      },
      timeout: 1000,
    },
  ];

  const run = async (answerIndex: number) => {
    let p = Promise.resolve();

    arr.forEach((i) => {
      p = p.then((arg: any) => {
        return new Promise((res) => {
          setTimeout(() => {
            const result: any = i.cb(answerIndex, arg);
            res(result);
          }, i.timeout);
        });
      });
    });
  };

  async function checkAnswer(answerIndex: number): Promise<void> {
    await run(answerIndex);
  }

  const handleClick = () => {
    game.resetGame();
    router.refresh();
  };

  return (
    <>
      {!currentQuestion ? (
        <Congrats money={money} onClick={handleClick} />
      ) : (
        <div className={styles.wrapper}>
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
                        checkAnswer(i);
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
          <div className={styles.rightSide}>
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
