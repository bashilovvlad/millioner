'use client';

import React, { useCallback, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';

import styles from './page.module.css';

import data from '../../public/data.json';

import { MillionaireGame } from '../lib/Game';
import { AnswerButton, MoneySlot } from '../ui';

import { RewardContext } from '../app_context';

enum PREFIXES {
  A,
  B,
  C,
  D,
}

const Quiz = () => {
  const context = useContext(RewardContext);
  const [game] = useState(new MillionaireGame(12, data));
  const router = useRouter();
  const currentQuestion = game.getCurrentQuestion();

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [selected, setSelected] = useState<null | number>(null);
  const [correct, setCorrect] = useState<null | number>(null);
  const [incorrect, setIncorrect] = useState<null | number>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  const steps = [
    {
      resolver: (answerIndex: number) => {
        setWaiting(true);
        return answerIndex;
      },
      timeout: 0,
    },
    {
      resolver: (answerIndex: number) => {
        const { correctAnswer } = currentQuestion;

        if (correctAnswer !== answerIndex) {
          setIncorrect(answerIndex);
          game.setContinue(false);
        }
        setCorrect(correctAnswer);

        return answerIndex;
      },
      timeout: 1000,
    },
    {
      resolver: () => {
        context.setReward(game.getReward());

        if (game.getFinish()) {
          game.resetGame();
          router.push('/win');
          return;
        }

        if (game.getContinue()) {
          game.next();
          setSelected(null);
          setCorrect(null);
          setIncorrect(null);
          setWaiting(false);
        } else {
          game.resetGame();
          router.push('/fail');
        }
      },
      timeout: 1000,
    },
  ];

  const run = async (answerIndex: number) => {
    await steps.reduce(async (previousPromise, step) => {
      await previousPromise;
      return new Promise((resolve) => {
        setTimeout(() => {
          step.resolver(answerIndex);

          resolve();
        }, step.timeout);
      });
    }, Promise.resolve());
  };

  const handleOpenRewards = useCallback(() => {
    setMenuOpened((state) => !state);
  }, []);

  const handleAnswerClick = (answerIndex: number) => () => {
    if (!waiting) {
      setSelected(answerIndex);
      run(answerIndex);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.openerOuter, menuOpened && styles.active)}>
        <button
          aria-label="opener"
          type="button"
          className={styles.openerInner}
          onClick={handleOpenRewards}
        />
      </div>
      <div className={styles.leftSide}>
        <div className={styles.mainHolder}>
          <p className={styles.question}>{currentQuestion.question}</p>
          <div className={styles.buttons}>
            {currentQuestion?.answers.map((answer, i) => (
              <AnswerButton
                key={`${answer}`}
                prefix={PREFIXES[i]}
                label={answer}
                onClick={handleAnswerClick(i)}
                selected={selected === i}
                correct={correct === i}
                incorrect={incorrect === i}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={clsx(styles.rightSide, menuOpened && styles.active)}>
        <div className={styles.slotsHolder}>
          {game.getQuestions().map((question, i) => (
            <MoneySlot
              key={question.reward}
              active={currentQuestion.id === question.id}
              passed={i < currentQuestion.id}
              label={question.reward}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
