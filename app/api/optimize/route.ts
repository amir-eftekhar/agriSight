import { NextRequest, NextResponse } from 'next/server';
import { generateYieldOptimization } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { cropType, region, currentIssues } = await request.json();

    if (!cropType || !region) {
      return NextResponse.json(
        { error: 'Crop type and region are required' },
        { status: 400 }
      );
    }

    // Generate optimization plan
    const optimizationPlan = await generateYieldOptimization(
      cropType,
      region,
      currentIssues
    );

    return NextResponse.json({
      success: true,
      plan: optimizationPlan,
    });
  } catch (error) {
    console.error('Optimization API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate optimization plan' },
      { status: 500 }
    );
  }
}

