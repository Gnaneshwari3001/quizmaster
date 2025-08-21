import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowLeft, Clock, ChevronLeft, ChevronRight, Flag, User } from "lucide-react";
import { quizQuestionsData } from "@/lib/quizQuestions";

interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "multiple-select" | "true-false" | "text";
  options?: string[];
  correctAnswer: string | string[];
  category: "technology" | "logic" | "brainstorming";
  difficulty: "easy" | "medium" | "hard";
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  submittedAnswers: Record<string, boolean>;
  showAnswers: Record<string, boolean>;
  timeLeft: number;
  isCompleted: boolean;
  startTime: number;
  guestName: string;
}

export default function QuizGuest() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);
  const [tempGuestName, setTempGuestName] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    if (!tempGuestName.trim()) return;

    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const questions: QuizQuestion[] = quizQuestionsData.map((q, index) => ({
      ...q,
      id: `q_${index}`,
    }));

    const shuffledQuestions = shuffleArray(questions).slice(0, 25);

    setQuizState({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      answers: {},
      submittedAnswers: {},
      showAnswers: {},
      timeLeft: 30 * 60, // 30 minutes in seconds
      isCompleted: false,
      startTime: Date.now(),
      guestName: tempGuestName.trim(),
    });

    setShowNameInput(false);
  };

  // Timer countdown
  useEffect(() => {
    if (!quizState || quizState.isCompleted || showNameInput) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (!prev) return null;
        
        const newTimeLeft = prev.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          // Time's up - auto submit
          submitQuiz(prev);
          return { ...prev, timeLeft: 0, isCompleted: true };
        }
        
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, showNameInput]);

  // Load current answer when question changes
  useEffect(() => {
    if (!quizState) return;
    
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const savedAnswer = quizState.answers[currentQuestion.id];
    setCurrentAnswer(savedAnswer || (currentQuestion.type === "multiple-select" ? [] : ""));
  }, [quizState?.currentQuestionIndex, quizState?.answers]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestion = (): QuizQuestion | null => {
    if (!quizState) return null;
    return quizState.questions[quizState.currentQuestionIndex];
  };

  const saveCurrentAnswer = useCallback(() => {
    if (!quizState) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    setQuizState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: currentAnswer
        }
      };
    });
  }, [quizState, currentAnswer]);

  const submitAnswer = () => {
    if (!quizState || !currentAnswer) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    setQuizState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: currentAnswer
        },
        submittedAnswers: {
          ...prev.submittedAnswers,
          [currentQuestion.id]: true
        }
      };
    });
  };

  const toggleShowAnswer = () => {
    if (!quizState) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    setQuizState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        showAnswers: {
          ...prev.showAnswers,
          [currentQuestion.id]: !prev.showAnswers[currentQuestion.id]
        }
      };
    });
  };

  const goToQuestion = (direction: 'next' | 'prev') => {
    if (!quizState) return;
    
    saveCurrentAnswer();
    
    setQuizState(prev => {
      if (!prev) return null;
      
      const newIndex = direction === 'next' 
        ? Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
        : Math.max(prev.currentQuestionIndex - 1, 0);
      
      return { ...prev, currentQuestionIndex: newIndex };
    });
  };

  const submitQuiz = async (finalQuizState?: QuizState) => {
    const stateToSubmit = finalQuizState || quizState;
    if (!stateToSubmit) return;

    setIsSubmitting(true);
    saveCurrentAnswer();

    // Calculate final results
    const finalAnswers = {
      ...stateToSubmit.answers,
      [getCurrentQuestion()?.id || '']: currentAnswer
    };

    const timeSpent = Math.floor((Date.now() - stateToSubmit.startTime) / 1000);
    
    // Navigate to results page with data
    navigate('/quiz/results', {
      state: {
        questions: stateToSubmit.questions,
        answers: finalAnswers,
        timeSpent,
        userId: undefined, // Guest mode
        displayName: stateToSubmit.guestName
      }
    });
  };

  // Guest name input screen
  if (showNameInput) {
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

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="shadow-quiz-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Guest Quiz Mode</CardTitle>
                <CardDescription>
                  Enter your name to start the quiz. Your results won't be saved to an account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="guestName">Your Name</Label>
                    <Input
                      id="guestName"
                      placeholder="Enter your name"
                      value={tempGuestName}
                      onChange={(e) => setTempGuestName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && tempGuestName.trim() && startQuiz()}
                    />
                  </div>
                  
                  <Button 
                    onClick={startQuiz} 
                    disabled={!tempGuestName.trim()}
                    className="w-full"
                  >
                    Start Guest Quiz
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Want to save your progress?</p>
                    <Link to="/signup" className="text-primary hover:underline">
                      Create an account instead →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!quizState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
  const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;

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
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-xs">
              Guest: {quizState.guestName}
            </Badge>
            
            <div className="flex items-center space-x-2 bg-card px-3 py-2 rounded-lg border">
              <Clock className="w-4 h-4 text-quiz-timer" />
              <span className={`font-mono text-sm ${quizState.timeLeft < 300 ? 'text-quiz-incorrect' : 'text-quiz-timer'}`}>
                {formatTime(quizState.timeLeft)}
              </span>
            </div>
            
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {currentQuestion && (
            <Card className="shadow-quiz-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {currentQuestion.category}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                <CardDescription>
                  Select one correct answer
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Multiple Choice Questions Only */}
                {currentQuestion.options && (
                  <RadioGroup
                    value={currentAnswer as string}
                    onValueChange={setCurrentAnswer}
                    className="space-y-3"
                    disabled={quizState.submittedAnswers[currentQuestion.id]}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        quizState.submittedAnswers[currentQuestion.id]
                          ? 'opacity-75 cursor-not-allowed'
                          : 'hover:bg-accent/50 cursor-pointer'
                      }`}>
                        <RadioGroupItem
                          value={option}
                          id={`option-${index}`}
                          disabled={quizState.submittedAnswers[currentQuestion.id]}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex-1 ${
                            quizState.submittedAnswers[currentQuestion.id]
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4 mt-8 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => goToQuestion('prev')}
                        disabled={quizState.currentQuestionIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => goToQuestion('next')}
                        disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
                    </div>

                    {isLastQuestion && Object.keys(quizState.submittedAnswers).length === quizState.questions.length && (
                      <Button
                        onClick={() => submitQuiz()}
                        disabled={isSubmitting}
                        className="bg-quiz-correct hover:bg-quiz-correct/90"
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Submitting..." : "Finish Quiz"}
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={submitAnswer}
                      disabled={!currentAnswer || quizState.submittedAnswers[currentQuestion?.id || '']}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {quizState.submittedAnswers[currentQuestion?.id || ''] ? "Answer Submitted" : "Submit Answer"}
                    </Button>

                    {quizState.submittedAnswers[currentQuestion?.id || ''] && (
                      <Button
                        variant="outline"
                        onClick={toggleShowAnswer}
                      >
                        {quizState.showAnswers[currentQuestion?.id || ''] ? "Hide Answer" : "Show Answer"}
                      </Button>
                    )}
                  </div>

                  {/* Show correct answer if toggled */}
                  {quizState.showAnswers[currentQuestion?.id || ''] && currentQuestion && (
                    <div className="bg-quiz-correct/10 border border-quiz-correct/20 rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Correct Answer:</div>
                      <div className="font-medium text-quiz-correct">
                        {currentQuestion.correctAnswer}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {currentAnswer === currentQuestion.correctAnswer ? "✅ Your answer is correct!" : "❌ Your answer is incorrect"}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
