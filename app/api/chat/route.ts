import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const ngrokUrl = process.env.NGROK_URL;
    if (!ngrokUrl) {
      return NextResponse.json(
        { error: 'NGROK_URL environment variable is not configured' },
        { status: 500 }
      );
    }

    // Call the external API
    const response = await fetch(`${ngrokUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'ai-advisor-v0.1-16k',
        prompt: prompt,
        stream: false,
      }),
      // 30 second timeout
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { 
          error: 'API request failed', 
          details: errorText || response.statusText 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout', details: 'The AI took too long to respond' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message || 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}

