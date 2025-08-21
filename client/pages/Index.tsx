import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, Trophy, Users, Zap, Target, ArrowRight, CheckCircle } from "lucide-react";

export default function Index() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "25 Mind-Bending Questions",
      description: "Creative brainstorming challenges and logical reasoning puzzles",
    },
    {
      icon: Clock,
      title: "30-Minute Timer",
      description: "Test your problem-solving skills under pressure with timed challenges",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Compete with other creative thinkers and see where you rank",
    },
    {
      icon: Users,
      title: "Guest & User Play",
      description: "Play as a guest or create an account to track your progress",
    },
  ];

  const questionTypes = [
    "Logic Puzzles",
    "Creative Challenges",
    "Math Reasoning",
    "Brainstorming Problems"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">QuizMaster</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            New Quiz Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            <span className="text-primary">Brainstorming</span> & Logic
            <br />
            Challenge Quiz
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Test your creative thinking and logical reasoning skills with our comprehensive quiz.
            25 carefully crafted questions covering brainstorming challenges and logic puzzles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/quiz/start">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-8 py-6 shadow-quiz-card hover:shadow-quiz-card-hover transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Quiz Now
                <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
            </Link>
            <Link to="/quiz/guest">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                Play as Guest
              </Button>
            </Link>
          </div>

          {/* Question Types */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {questionTypes.map((type, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                <CheckCircle className="w-3 h-3 mr-1 text-quiz-correct" />
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Our Quiz Platform?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for creative thinkers, problem solvers, and anyone who loves mental challenges.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-quiz-card-hover transition-all duration-300 border-border/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border/50">
          <CardContent className="py-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">25</div>
                <div className="text-muted-foreground">Unique Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">30</div>
                <div className="text-muted-foreground">Minutes to Complete</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-muted-foreground">Question Types</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Test Your Skills?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of creative thinkers and challenge yourself with our mind-bending quiz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6">
                <Target className="w-5 h-5 mr-2" />
                Create Account
              </Button>
            </Link>
            <Link to="/quiz/guest">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6">
                Try Guest Mode
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">QuizMaster</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/30 text-center text-sm text-muted-foreground">
            © 2024 QuizMaster. Built for creative thinkers and problem solvers.
          </div>
        </div>
      </footer>
    </div>
  );
}
