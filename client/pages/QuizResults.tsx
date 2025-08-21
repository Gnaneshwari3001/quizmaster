import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  ArrowLeft,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  RotateCcw,
  Share2,
  Eye,
  EyeOff
} from "lucide-react";
import { quizService } from "@/lib/quizService";

interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "multiple-select" | "true-false" | "text";
  options?: string[];
  correctAnswer: string | string[];
  category: "technology" | "logic" | "brainstorming";
  difficulty: "easy" | "medium" | "hard";
}

interface LocationState {
  questions: QuizQuestion[];
  answers: Record<string, string | string[]>;
  timeSpent: number;
  userId?: string;
  displayName: string;
}

export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const state = location.state as LocationState;

  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }

    // Save quiz attempt to database
    saveQuizAttempt();
  }, [state]);

  const saveQuizAttempt = async () => {
    if (!state || isSaved) return;

    setIsLoading(true);
    try {
      const score = quizService.calculateScore(state.questions, state.answers);
      
      await quizService.saveQuizAttempt({
        userId: state.userId,
        guestId: !state.userId ? `guest_${Date.now()}` : undefined,
        answers: state.answers,
        score,
        totalQuestions: state.questions.length,
        timeSpent: state.timeSpent,
        completedAt: Date.now(),
        displayName: state.displayName,
      });

      setIsSaved(true);
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }
    setIsLoading(false);
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">No quiz data found.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { questions, answers, timeSpent, displayName } = state;
  
  // Calculate results
  const score = quizService.calculateScore(questions, answers);
  const correctCount = questions.filter(q => {
    const userAnswer = answers[q.id];
    if (q.type === 'multiple-select') {
      const correctAnswers = q.correctAnswer as string[];
      const userAnswers = userAnswer as string[];
      return userAnswers && 
             correctAnswers.length === userAnswers.length &&
             correctAnswers.every(answer => userAnswers.includes(answer));
    } else if (q.type === 'text') {
      const correctText = (q.correctAnswer as string).toLowerCase().trim();
      const userText = (userAnswer as string)?.toLowerCase().trim();
      return correctText === userText;
    } else {
      return userAnswer === q.correctAnswer;
    }
  }).length;

  const incorrectCount = questions.length - correctCount;
  const timeInMinutes = Math.floor(timeSpent / 60);
  const timeInSeconds = timeSpent % 60;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-quiz-correct";
    if (score >= 60) return "text-quiz-warning";
    return "text-quiz-incorrect";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding! 🎉";
    if (score >= 80) return "Excellent work! 👏";
    if (score >= 70) return "Good job! 👍";
    if (score >= 60) return "Not bad! 🤔";
    return "Keep practicing! 💪";
  };

  const isCorrectAnswer = (question: QuizQuestion, userAnswer: string | string[]) => {
    if (question.type === 'multiple-select') {
      const correctAnswers = question.correctAnswer as string[];
      const userAnswers = userAnswer as string[];
      return userAnswers && 
             correctAnswers.length === userAnswers.length &&
             correctAnswers.every(answer => userAnswers.includes(answer));
    } else if (question.type === 'text') {
      const correctText = (question.correctAnswer as string).toLowerCase().trim();
      const userText = (userAnswer as string)?.toLowerCase().trim();
      return correctText === userText;
    } else {
      return userAnswer === question.correctAnswer;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuizMaster</span>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Results Summary */}
          <Card className="shadow-quiz-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription>
                Great job, {displayName}! Here are your results.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="text-center mb-8">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <p className="text-xl text-muted-foreground mb-4">
                  {getScoreMessage(score)}
                </p>
                <Progress value={score} className="h-3 mb-4" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-quiz-correct/10 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-quiz-correct mx-auto mb-2" />
                  <div className="text-2xl font-bold text-quiz-correct">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                
                <div className="text-center p-4 bg-quiz-incorrect/10 rounded-lg">
                  <XCircle className="w-8 h-8 text-quiz-incorrect mx-auto mb-2" />
                  <div className="text-2xl font-bold text-quiz-incorrect">{incorrectCount}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                
                <div className="text-center p-4 bg-quiz-timer/10 rounded-lg">
                  <Clock className="w-8 h-8 text-quiz-timer mx-auto mb-2" />
                  <div className="text-2xl font-bold text-quiz-timer">
                    {timeInMinutes}:{timeInSeconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quiz/start">
                  <Button size="lg" className="w-full sm:w-auto">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Target className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={() => {
                  const text = `I just scored ${score}% on the QuizMaster Tech & Brainstorming Quiz! ${correctCount}/${questions.length} correct answers.`;
                  navigator.share ? navigator.share({ text }) : navigator.clipboard.writeText(text);
                }}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Answer Review */}
          <Card className="shadow-quiz-card">
            <CardHeader>
              <CardTitle>Answer Review</CardTitle>
              <CardDescription>
                Review all questions and see the correct answers
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = answers[question.id];
                  const isCorrect = isCorrectAnswer(question, userAnswer);
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Q{index + 1}
                          </Badge>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {question.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {question.difficulty}
                          </Badge>
                        </div>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-quiz-correct" />
                        ) : (
                          <XCircle className="w-5 h-5 text-quiz-incorrect" />
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-3">{question.question}</h3>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Your answer: </span>
                          <span className={isCorrect ? "text-quiz-correct" : "text-quiz-incorrect"}>
                            {Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer || 'No answer'}
                          </span>
                        </div>
                        
                        {!isCorrect && (
                          <div>
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-quiz-correct">
                              {Array.isArray(question.correctAnswer) 
                                ? question.correctAnswer.join(', ') 
                                : question.correctAnswer}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
