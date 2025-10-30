import { NextRequest, NextResponse } from 'next/server';
import { detectDisease } from '@/lib/modelHandler';
import { analyzeDisease } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { image, userId } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    // Step 1: Run ML model detection
    const detectionResult = await detectDisease(image);

    // Step 2: Get AI analysis from Gemini
    let aiAnalysis = '';
    try {
      // Extract base64 data
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      };

      const geminiResult = await analyzeDisease(imagePart, detectionResult);
      aiAnalysis = geminiResult || 'AI analysis temporarily unavailable. Please refer to the detection results.';
    } catch (error) {
      console.error('Gemini API error:', error);
      // Continue even if Gemini fails
      aiAnalysis = 'AI analysis temporarily unavailable. Please refer to the detection results.';
    }

    // Step 3: Save to database (if userId provided)
    // This would use Supabase in production
    // if (userId) {
    //   await saveDetectionResult(userId, imageUrl, detectionResult.disease, detectionResult.confidence, aiAnalysis);
    // }

    return NextResponse.json({
      success: true,
      detection: detectionResult,
      analysis: aiAnalysis,
    });
  } catch (error) {
    console.error('Detection API error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

