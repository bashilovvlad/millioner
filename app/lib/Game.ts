
interface IQuestion {
    question: string;
    answers: string[];
    correctAnswer: number;
    money: number;
    id: number;
}

interface IResult {
    isCorrect: boolean,
    correctAnswer: number,
    next: () => void
}

export class MillionaireGame {
    private questionNumber: number = 0;
    private money: number = 0;
    private maxQuestions: number = 0;
    private questions: IQuestion[] = [];

    constructor(maxQuestions: number, questions: IQuestion[]) {
        this.maxQuestions = maxQuestions;
        this.questions = questions.slice(0, maxQuestions);
    }

    public getCurrentQuestion() {
        return this.questions[this.questionNumber];
    }

    public getMoney() {
        return this.money;
    }

    public resetGame() {
        this.questionNumber = 0;
        this.money = 0;
    }

    public getMaxquestions() {
        return this.maxQuestions;
    }

    public checkAnswer(answerIndex: number): IResult {
        if (answerIndex === this.questions[this.questionNumber].correctAnswer) {

            return {
                isCorrect: true,
                correctAnswer: this.questions[this.questionNumber].correctAnswer,
                next: () => {
                    if (this.questionNumber < this.maxQuestions) {
                        this.money = this.questions[this.questionNumber].money;
                        this.questionNumber++;
                    }
                }
            };
        } else {

            return {
                isCorrect: false,
                correctAnswer: this.questions[this.questionNumber].correctAnswer,
                next: () => {
                    this.money = 0;
                    this.questionNumber = 0;
                }
            };
        }
    }
}