import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, TrendingUp } from "lucide-react";

export function AITaskGenerator() {
  return (
    <Card className="border-2 border-dashed border-muted-foreground/20 bg-muted/20">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Generate More Smart Tasks
            </h3>
            <p className="text-muted-foreground max-w-md">
              Let AI analyze your pipeline and create personalized next steps
            </p>
          </div>
          
          <Button size="lg" className="mt-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Tasks with AI
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Missing tasks or next steps? Review pipeline for more tasks to create
          </p>
        </div>
      </CardContent>
    </Card>
  );
}