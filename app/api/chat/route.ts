import { NextRequest, NextResponse } from 'next/server';

// Language detection function
function detectLanguage(text: string): 'arabic' | 'english' {
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicRegex = /[\u0600-\u06FF]/;
  
  // Check if text contains Arabic characters
  if (arabicRegex.test(text)) {
    return 'arabic';
  }
  
  return 'english';
}

// Create language instruction message
function createLanguageInstruction(language: 'arabic' | 'english'): string {
  if (language === 'arabic') {
    return 'يرجى الرد باللغة العربية فقط.';
  }
  return 'Please respond in English only.';
}

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

    // Detect language from the last user message
    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        lastUserIndex = i;
        break;
      }
    }
    
    let messagesWithLanguageInstruction = [...messages];
    
    if (lastUserIndex !== -1) {
      const lastUserMessage = messages[lastUserIndex];
      
      if (lastUserMessage && lastUserMessage.content) {
        const detectedLanguage = detectLanguage(lastUserMessage.content);
        const languageInstruction = createLanguageInstruction(detectedLanguage);
        
        // Add language instruction as a separate user message before the actual user message
        // This ensures the AI responds in the correct language without overriding system prompt
        const instructionMessage = {
          role: 'user' as const,
          content: languageInstruction
        };
        
        // Insert the instruction message right before the last user message
        messagesWithLanguageInstruction = [
          ...messages.slice(0, lastUserIndex),
          instructionMessage,
          ...messages.slice(lastUserIndex)
        ];
        
        console.log(`Detected language: ${detectedLanguage}, added language instruction`);
      }
    }

    // Call the Ollama /api/chat endpoint with conversation messages
    const response = await fetch(`${ngrokUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen_2762_persona_v3',
        messages: messagesWithLanguageInstruction,
        stream: false,
        options: {
          // Generation parameters
          temperature: 0.7,
          top_p: 0.9,
          top_k: 50,
          
          // Anti-repetition (these are CRITICAL)
          repeat_penalty: 1.4,
          presence_penalty: 0.6,
          frequency_penalty: 0.3,
          
          // Context and length (your settings are perfect)
          num_predict: -1,
          num_ctx: 65536,
          
          // Clean stops
          stop: ["</s>", "[/INST]", "\n\n\n"]
        }
      }),
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

