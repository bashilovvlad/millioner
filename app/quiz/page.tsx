"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

import { Button } from "../ui";
import { questions } from "../lib/questions";

const maxQuestions = 12; // Максимальна кількість питань

class MillionaireGame {
  private questionNumber: number = 0;
  private money: number = 0;

  constructor() {
    // усі питання
  }

  public getCurrentQuestion() {
    return questions[this.questionNumber];
  }

  public getMoney() {
    return this.money;
  }

  public resetGame() {
    this.questionNumber = 0;
    this.money = 0;
  }

  public checkAnswer(answerIndex: number): boolean {
    if (answerIndex === questions[this.questionNumber].correctAnswer) {
      if (this.questionNumber < maxQuestions) {
        this.money = questions[this.questionNumber].money;
        this.questionNumber++;
      }
      return true;
    } else {
      alert("Wrong answer. Game over.");
      this.money = 0;
      this.questionNumber = 0;
      return false;
    }
  }
}

const game = new MillionaireGame();

enum PREFIXES {
  A,
  B,
  C,
  D,
}

export default function Home() {
  const router = useRouter();
  const [money, setMoney] = useState(game.getMoney());
  const currentQuestion = game.getCurrentQuestion();

  function checkAnswer(answerIndex: number): void {
    if (game.checkAnswer(answerIndex)) {
      setMoney(game.getMoney());
    } else {
      setMoney(0);
    }
  }

  return (
    <>
      {!currentQuestion ? (
        <>
          <p>Congratulations! You have won $1,000,000!</p>
          <Button
            label={"Reset game"}
            onClick={() => {
              game.resetGame();
              router.refresh();
            }}
          />
        </>
      ) : (
        <>
          <div className={styles.leftSide}>
            <p>Money: ${money}</p>
            <p>Question: {currentQuestion.question}</p>
            {currentQuestion?.answers.map((item, i) => (
              <Button
                key={i}
                prefix={PREFIXES[i]}
                label={item}
                onClick={() => checkAnswer(i)}
              />
            ))}
          </div>

          <div className={styles.rightSide}>
            {questions.map((q, i) => (
              <div
                key={i}
                className={clsx(
                  styles.moneyItem,
                  currentQuestion.id === q.id && styles.activeMoneyItem,
                  i < currentQuestion.id && styles.passedMoneyItem
                )}
              >
                ${q.money}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
