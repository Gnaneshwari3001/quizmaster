import { database } from './firebase';
import { ref, push, set, get, query, orderByChild, limitToLast } from 'firebase/database';

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false' | 'text';
  options?: string[];
  correctAnswer: string | string[];
  category: 'technology' | 'logic' | 'brainstorming';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  id: string;
  userId?: string;
  guestId?: string;
  answers: Record<string, string | string[]>;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: number; // timestamp
  displayName?: string;
}

export interface LeaderboardEntry {
  id: string;
  displayName: string;
  score: number;
  totalQuestions: number;
  completedAt: number;
}

class QuizService {
  // Save quiz attempt
  async saveQuizAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<string> {
    const attemptsRef = ref(database, 'quiz-attempts');
    const newAttemptRef = push(attemptsRef);
    await set(newAttemptRef, {
      ...attempt,
      id: newAttemptRef.key,
    });
    return newAttemptRef.key!;
  }

  // Get leaderboard (top 10 scores)
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const attemptsRef = ref(database, 'quiz-attempts');
    const leaderboardQuery = query(
      attemptsRef,
      orderByChild('score'),
      limitToLast(10)
    );
    
    const snapshot = await get(leaderboardQuery);
    const attempts: QuizAttempt[] = [];
    
    snapshot.forEach((child) => {
      attempts.push(child.val());
    });

    // Sort by score descending and map to leaderboard entries
    return attempts
      .sort((a, b) => b.score - a.score)
      .map((attempt) => ({
        id: attempt.id,
        displayName: attempt.displayName || 'Anonymous',
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        completedAt: attempt.completedAt,
      }));
  }

  // Get user's quiz history
  async getUserQuizHistory(userId: string): Promise<QuizAttempt[]> {
    const attemptsRef = ref(database, 'quiz-attempts');
    const userQuery = query(attemptsRef, orderByChild('userId'));
    
    const snapshot = await get(userQuery);
    const attempts: QuizAttempt[] = [];
    
    snapshot.forEach((child) => {
      const attempt = child.val();
      if (attempt.userId === userId) {
        attempts.push(attempt);
      }
    });

    return attempts.sort((a, b) => b.completedAt - a.completedAt);
  }

  // Initialize quiz questions in database
  async initializeQuizQuestions(): Promise<void> {
    const questionsRef = ref(database, 'quiz-questions');
    
    // Check if questions already exist
    const snapshot = await get(questionsRef);
    if (snapshot.exists()) {
      console.log('Quiz questions already initialized');
      return;
    }

    const questions: Omit<QuizQuestion, 'id'>[] = [
      {
        question: "What does HTTP stand for?",
        type: "multiple-choice",
        options: [
          "HyperText Transfer Protocol",
          "High Technology Transfer Process",
          "Home Tool Transfer Protocol",
          "HyperText Transmission Protocol"
        ],
        correctAnswer: "HyperText Transfer Protocol",
        category: "technology",
        difficulty: "easy"
      },
      {
        question: "What does GPT stand for in artificial intelligence?",
        type: "multiple-choice",
        options: [
          "General Purpose Technology",
          "Generative Pre-trained Transformer",
          "Global Processing Tool",
          "Graphic Processing Terminal"
        ],
        correctAnswer: "Generative Pre-trained Transformer",
        category: "technology",
        difficulty: "medium"
      },
      {
        question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
        type: "multiple-choice",
        options: ["0°", "7.5°", "15°", "22.5°"],
        correctAnswer: "7.5°",
        category: "logic",
        difficulty: "medium"
      },
      {
        question: "Which sorting algorithm has O(n log n) complexity in the best case?",
        type: "multiple-choice",
        options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
        correctAnswer: "Merge Sort",
        category: "technology",
        difficulty: "medium"
      },
      {
        question: "A man pushes his car to a hotel and loses his fortune. Why?",
        type: "text",
        correctAnswer: "He's playing Monopoly",
        category: "brainstorming",
        difficulty: "hard"
      },
      {
        question: "JavaScript is a compiled language.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: "False",
        category: "technology",
        difficulty: "easy"
      },
      {
        question: "Which of the following are valid JavaScript data types? (Select all that apply)",
        type: "multiple-select",
        options: ["String", "Number", "Boolean", "Integer", "Object"],
        correctAnswer: ["String", "Number", "Boolean", "Object"],
        category: "technology",
        difficulty: "medium"
      }
      // Add more questions here to reach 50 total
    ];

    // Save each question to Firebase
    for (const question of questions) {
      const questionRef = push(questionsRef);
      await set(questionRef, {
        ...question,
        id: questionRef.key,
      });
    }

    console.log('Quiz questions initialized successfully');
  }

  // Get all quiz questions
  async getQuizQuestions(): Promise<QuizQuestion[]> {
    const questionsRef = ref(database, 'quiz-questions');
    const snapshot = await get(questionsRef);
    
    const questions: QuizQuestion[] = [];
    snapshot.forEach((child) => {
      questions.push(child.val());
    });

    return questions;
  }

  // Calculate quiz score
  calculateScore(questions: QuizQuestion[], answers: Record<string, string | string[]>): number {
    let correct = 0;
    
    for (const question of questions) {
      const userAnswer = answers[question.id];
      
      if (question.type === 'multiple-select') {
        const correctAnswers = question.correctAnswer as string[];
        const userAnswers = userAnswer as string[];
        
        if (userAnswers && 
            correctAnswers.length === userAnswers.length &&
            correctAnswers.every(answer => userAnswers.includes(answer))) {
          correct++;
        }
      } else {
        if (question.type === 'text') {
          // For text questions, we can do case-insensitive comparison
          const correctText = (question.correctAnswer as string).toLowerCase().trim();
          const userText = (userAnswer as string)?.toLowerCase().trim();
          if (correctText === userText) {
            correct++;
          }
        } else {
          if (userAnswer === question.correctAnswer) {
            correct++;
          }
        }
      }
    }
    
    return Math.round((correct / questions.length) * 100);
  }
}

export const quizService = new QuizService();
