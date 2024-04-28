
export interface IQuestion {
    question: string;
    answers: string[];
    correctAnswer: number;
    reward: number;
    id: number;
}

export class MillionaireGame {
    questionNumber: number = 0;
    reward: number = 0;
    maxQuestions: number = 0;
    questions: IQuestion[] = [];

    continue: boolean = false;

    constructor(maxQuestions: number, questions: IQuestion[]) {
        this.maxQuestions = maxQuestions;
        this.questions = questions.slice(0, maxQuestions);
        this.continue = true
    }

    getCurrentQuestion() {
        return this.questions[this.questionNumber];
    }

    getReward() {
        return this.getFinish() ? this.getCurrentQuestion().reward : this.reward
    }

    resetGame() {
        this.questionNumber = 0;
        this.reward = 0;
        this.continue = true;
    }

    getMaxquestions() {
        return this.maxQuestions;
    }

    getQuestions() {
        return this.questions
    }

    setContinue(key: boolean) {
        this.continue = key
    }

    getContinue() {
        return this.continue
    }

    getFinish() {
        return this.questionNumber === this.maxQuestions - 1
    }

    next() {
        if (this.questionNumber < this.maxQuestions) {
            this.reward = this.getCurrentQuestion().reward;
            this.questionNumber++;
            return true
        }
        return false
    }
}