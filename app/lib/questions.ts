import { IQuestion } from './Game'

export const questions: IQuestion[] = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: 0,
        reward: 500,
        id: 0
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
        correctAnswer: 1,
        reward: 1000,
        id: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo", "Leonardo da Vinci",],
        correctAnswer: 3,
        reward: 2000,
        id: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctAnswer: 2,
        reward: 4000,
        id: 3
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["CO2", "O2", "H2O", "CH4"],
        correctAnswer: 2,
        reward: 8000,
        id: 4
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: 0,
        reward: 16000,
        id: 5
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        correctAnswer: 0,
        reward: 32000,
        id: 6
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Quartz", "Steel", "Graphite", "Diamond"],
        correctAnswer: 3,
        reward: 64000,
        id: 7
    },
    {
        question: "Who invented the telephone?",
        answers: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Albert Einstein"],
        correctAnswer: 2,
        reward: 125000,
        id: 8
    },
    {
        question: "What is the currency of Japan?",
        answers: ["Dollar", "Yen", "Euro", "Pound"],
        correctAnswer: 1,
        reward: 250000,
        id: 9
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: 2,
        reward: 500000,
        id: 10
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Ag", "Fe", "Cu", "Au"],
        correctAnswer: 3,
        reward: 1000000,
        id: 11
    }
];