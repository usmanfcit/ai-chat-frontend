import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
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

    // System prompt is configured in the Modelfile, so we pass messages directly
    console.log('Using system prompt from Modelfile');

    // Call the Ollama /api/chat endpoint with conversation messages
    const response = await fetch(`${ngrokUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen_2762_persona_v2',
        messages: messages,
        stream: false,
        options: {
          temperature: 0.7,        // Balanced creativity while maintaining coherence
          top_p: 0.9,             // Good vocabulary variety without being excessive
          top_k: 50,              // Balanced word choices for natural variation
          repeat_penalty: 1.4,    // Moderate anti-repetition without being aggressive
          num_predict: -1,       // Allows longer detailed responses
          num_ctx: 16384,         // Extended context window for better understanding
          stop: ["</s>", "[/INST]", "\n\n\n"] // Stop sequences
        }
      }),
      // 60 second timeout for longer conversations
      signal: AbortSignal.timeout(60000),
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

    // Validate response format
    if (!data.message || !data.message.content) {
      return NextResponse.json(
        { error: 'Invalid response format from AI', details: 'Missing message content' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
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

