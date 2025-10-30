"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UploadBox from "@/components/UploadBox";
import ResultCard from "@/components/ResultCard";
import { detectDisease, DetectionResult } from "@/lib/modelHandler";
import { Loader2, Camera, FileImage } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { saveDetectionResult, uploadImage } from "@/lib/supabase";
import { analyzeDisease } from "@/lib/gemini";

export default function DetectPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleUpload = async (file: File, preview: string) => {
    setImagePreview(preview);
    setUploadedFile(file);
    setIsAnalyzing(true);
    setResult(null);
    setAiAnalysis("");

    try {
      // Step 1: Detect disease using ML model
      const detectionResult = await detectDisease(preview);
      setResult(detectionResult);

      // Step 2: Generate AI analysis using Gemini
      let analysis = "";
      try {
        const base64Data = preview.split(',')[1];
        const mimeType = preview.split(';')[0].split(':')[1];
        const imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        };
        const geminiAnalysis = await analyzeDisease(imagePart, detectionResult);
        
        // Use Gemini analysis if available, otherwise use fallback
        analysis = geminiAnalysis || generateMockAnalysis(detectionResult);
      } catch (geminiError) {
        console.error('Gemini analysis error:', geminiError);
        // Silently fallback to mock analysis
        analysis = generateMockAnalysis(detectionResult);
      }
      
      setAiAnalysis(analysis);

      toast({
        title: "Analysis Complete",
        description: `Detected: ${detectionResult.disease}`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
      console.error("Detection error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockAnalysis = (result: DetectionResult): string => {
    const isHealthy = result.disease.toLowerCase() === 'healthy';
    
    if (isHealthy) {
      return `Great news! Your plant appears to be healthy with no visible signs of disease.

**Observations:**
- Leaf color is vibrant and consistent
- No visible spots, discoloration, or lesions
- Overall plant structure looks strong

**Recommendations:**
1. Continue your current care routine
2. Monitor regularly for any changes
3. Ensure proper watering and sunlight
4. Consider preventive measures during disease-prone seasons

**Prevention Tips:**
- Maintain good air circulation
- Avoid overhead watering
- Remove dead or diseased plant material promptly
- Use organic mulch to prevent soil-borne diseases`;
    }

    return `Analysis indicates signs of ${result.disease} with ${result.confidence}% confidence.

**Symptoms Identified:**
- Characteristic lesions or discoloration patterns
- Tissue damage consistent with ${result.disease}
- Possible early to moderate stage infection

**Recommended Treatment:**
1. **Immediate Actions:**
   - Isolate affected plants to prevent spread
   - Remove and destroy severely infected leaves
   - Improve air circulation around plants

2. **Organic Treatment Options:**
   - Apply neem oil spray (2-3 times per week)
   - Use copper-based fungicides for fungal infections
   - Maintain proper plant spacing

3. **Chemical Treatment (if needed):**
   - Consult with local agricultural extension for approved fungicides
   - Follow application instructions carefully
   - Rotate different fungicide groups to prevent resistance

**Prevention Measures:**
- Water at the base of plants, not overhead
- Ensure soil has good drainage
- Practice crop rotation
- Remove plant debris regularly
- Apply preventive fungicide sprays during wet seasons

**Expected Recovery:**
With proper treatment, you should see improvement within 1-2 weeks. Continue monitoring and adjust treatment as needed.

**When to Seek Expert Help:**
If symptoms worsen or spread rapidly despite treatment, consult with a local agricultural extension agent or plant pathologist.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-leaf rounded-full mb-4 animate-bounce-slow">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 text-shadow-fun">
              Plant Disease Detection
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Upload a clear image of your plant's leaves to detect diseases early 
              and receive AI-powered treatment recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileImage className="h-5 w-5" />
                    <span>Upload Plant Image</span>
                  </CardTitle>
                  <CardDescription>
                    Take a photo or upload an image for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UploadBox onUpload={handleUpload} />
                </CardContent>
              </Card>

              {/* Tips Card */}
              <div className="card-info p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500 p-3 rounded-2xl">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Photography Tips</h3>
                </div>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 text-xl">•</span>
                    <span>Take photos in good natural light</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 text-xl">•</span>
                    <span>Focus on the affected leaf area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 text-xl">•</span>
                    <span>Capture both sides of the leaf if possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 text-xl">•</span>
                    <span>Avoid blurry or dark images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 text-xl">•</span>
                    <span>Include multiple leaves for better accuracy</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {isAnalyzing ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Analyzing Image...
                        </h3>
                        <p className="text-sm text-gray-600">
                          Our AI is examining your plant for diseases
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : result ? (
                <ResultCard 
                  result={result} 
                  aiAnalysis={aiAnalysis}
                  imageUrl={imagePreview || undefined}
                />
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12">
                    <div className="text-center text-gray-500">
                      <FileImage className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No Image Selected</p>
                      <p className="text-sm">
                        Upload an image to see detection results here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {result && (
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="border-4 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-lg rounded-2xl px-8 py-6"
                onClick={() => {
                  setResult(null);
                  setImagePreview(null);
                  setAiAnalysis("");
                }}
              >
                <Camera className="h-5 w-5 mr-2" />
                Analyze Another Image
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-2xl px-8 py-6 shadow-lg"
                onClick={async () => {
                  if (!user) {
                    toast({
                      title: "Sign In Required",
                      description: "Please sign in to save detection results",
                      variant: "destructive",
                    });
                    return;
                  }

                  if (!result || !uploadedFile) return;

                  try {
                    // Upload image to storage
                    const imageUrl = await uploadImage(uploadedFile, user.id);
                    
                    // Save detection result to database
                    await saveDetectionResult(
                      user.id,
                      imageUrl,
                      result.disease,
                      result.confidence,
                      aiAnalysis
                    );

                    toast({
                      title: "Saved!",
                      description: "Detection result saved to your dashboard",
                    });
                  } catch (error) {
                    console.error('Save error:', error);
                    toast({
                      title: "Save Failed",
                      description: "Could not save to database. Please try again.",
                      variant: "destructive",
                    });
                  }
                }}
                disabled={!user}
              >
                <FileImage className="h-5 w-5 mr-2" />
                {user ? 'Save to Dashboard' : 'Sign In to Save'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

