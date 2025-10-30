"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Activity } from "lucide-react";
import { DetectionResult } from "@/lib/modelHandler";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ResultCardProps {
  result: DetectionResult;
  aiAnalysis?: string;
  imageUrl?: string;
}

export default function ResultCard({ result, aiAnalysis, imageUrl }: ResultCardProps) {
  const isHealthy = result.disease.toLowerCase() === 'healthy';
  const confidenceColor = 
    result.confidence >= 80 ? 'text-green-600' :
    result.confidence >= 60 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {isHealthy ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <AlertCircle className="h-8 w-8 text-amber-600" />
              )}
              <div>
                <CardTitle className="text-2xl">
                  {result.disease}
                </CardTitle>
                <CardDescription className="mt-1">
                  Detection confidence: {result.confidence}%
                </CardDescription>
              </div>
            </div>
            <Badge 
              variant={isHealthy ? "default" : "destructive"}
              className={cn(
                isHealthy && "bg-green-600 hover:bg-green-700"
              )}
            >
              {isHealthy ? "Healthy" : "Disease Detected"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Confidence Level:</span>
            <span className={cn("text-sm font-bold", confidenceColor)}>
              {result.confidence}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={cn(
                "h-2.5 rounded-full transition-all",
                result.confidence >= 80 ? "bg-green-600" :
                result.confidence >= 60 ? "bg-yellow-500" :
                "bg-red-500"
              )}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Card */}
      {aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Analysis</CardTitle>
            <CardDescription>
              Comprehensive insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <MarkdownRenderer content={aiAnalysis} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Predictions */}
      {result.allPredictions && result.allPredictions.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Other Possible Conditions</CardTitle>
            <CardDescription>
              Alternative diagnoses ranked by confidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {result.allPredictions.slice(1, 6).map((pred, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm text-gray-700">{pred.disease}</span>
                  <span className="text-sm font-medium text-gray-500">
                    {pred.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

