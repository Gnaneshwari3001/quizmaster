import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft, Brain } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedAction?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  suggestedAction = "Continue building this feature" 
}: PlaceholderPageProps) {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-quiz-card">
            <CardHeader className="py-12">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Construction className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-lg mt-2">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-12">
              <p className="text-muted-foreground mb-6">
                This page is under construction. {suggestedAction} to unlock this feature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="w-full sm:w-auto">
                    Return to Homepage
                  </Button>
                </Link>
                <Link to="/quiz/guest">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Try Guest Quiz
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
