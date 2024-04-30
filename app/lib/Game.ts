export interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
  reward: number;
  id: number;
}

export enum GameState {
  NOT_STARTED,
  IN_PROGRESS,
  WON,
  LOST,
}

export class MillionaireGame {
  questionNumber: number = 0;

  reward: number = 0;

  maxQuestions: number = 0;

  questions: IQuestion[] = [];

  status = GameState.NOT_STARTED;

  constructor(maxQuestions: number, questions: IQuestion[]) {
    this.maxQuestions = maxQuestions;
    this.questions = questions.slice(0, maxQuestions);
    this.status = GameState.IN_PROGRESS;
  }

  getCurrentQuestion() {
    return this.questions[this.questionNumber];
  }

  getReward() {
    if (this.isWon()) {
      this.reward = this.getCurrentQuestion().reward;
    }

    if (this.isLost()) {
      this.reward = this.questionNumber === 0 ? 0 : this.questions[this.questionNumber - 1].reward;
    }

    return this.reward;
  }

  resetGame() {
    this.questionNumber = 0;
    this.reward = 0;
    this.status = GameState.NOT_STARTED;
  }

  getMaxquestions() {
    return this.maxQuestions;
  }

  getQuestions() {
    return this.questions;
  }

  setStatus(status: number) {
    this.status = status;
  }

  isFinished() {
    return this.status === GameState.LOST || this.status === GameState.WON;
  }

  isWon() {
    return this.status === GameState.WON;
  }

  isLost() {
    return this.status === GameState.LOST;
  }

  next() {
    if (this.questionNumber < this.maxQuestions) {
      this.questionNumber += 1;
    }
  }
}
