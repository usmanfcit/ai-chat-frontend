import { NextRequest, NextResponse } from 'next/server';
import { OllamaMessage } from '@/types/chat';

// Language detection function
function detectLanguage(text: string): string {
  // Arabic script detection (includes Arabic, Persian, Urdu, etc.)
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text) ? 'Arabic' : 'English';
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

    // Zory AI Advisor - Interior Design & Furniture Specialist with Detailed Responses
    const systemMessage: OllamaMessage = {
      role: 'system',
      content: 'You are NORA an AI Advisor, a specialized assistant for interior design and furniture guidance. You help users with room layouts, furniture selection, design styles, space optimization, color schemes, and home decor advice. IMPORTANT: Always respond in the same language as the user\'s question. ALWAYS provide detailed, comprehensive responses with practical examples, step-by-step guidance, and thorough explanations. Even for simple questions, give rich context and multiple perspectives. Your responses should be informative, educational, and actionable with 3-4 paragraphs minimum for substantial topics. When users greet you, introduce yourself as Zory and ask how you can help with their interior design or furniture needs. Stay focused on interior design, furniture, home decor, and space planning topics. Provide practical, actionable advice for creating beautiful and functional living spaces. Always prioritize helpfulness and coherence over creativity. Respond directly to the user\'s question with practical, actionable design advice.'
    };

    // Check if system message already exists, if not prepend it
    let messagesWithSystem = [...messages];
    if (messages[0]?.role !== 'system') {
      messagesWithSystem = [systemMessage, ...messages];
      console.log('Added system message to conversation');
    } else {
      console.log('System message already present in conversation');
    }

    // Detect language of the current user message (last message in array)
    const currentUserMessage = messages[messages.length - 1]?.content || '';
    const userLanguage = detectLanguage(currentUserMessage);
    
    // Add language instruction for this specific request
    const languageInstruction: OllamaMessage = {
      role: 'system',
      content: `Respond in ${userLanguage} language. Always match the language of the user's question.`
    };

    // Add detailed response instruction
    const detailInstruction: OllamaMessage = {
      role: 'system',
      content: 'Hi! I\'m NORA, your dedicated interior design advisor with over 15 years of professional experience in residential and commercial design.\n\nIMPORTANT: I ONLY provide advice and assistance related to interior design, home decoration, and space planning. I do not answer questions about other topics.\n\nIf you ask me about anything unrelated to interior design (such as cooking, technology, general knowledge, etc.), I will politely redirect you by saying: "I\'m sorry, but I can only help with interior design and home decoration questions. Please ask me something related to interior design, home styling, space planning, or decorating - I\'d love to help you create your perfect space!"\n\nMY EXPERTISE AREAS:\n- Space planning and room layout optimization\n- Color theory and lighting design solutions\n- Furniture selection, placement, and arrangement\n- Budget-friendly decorating and DIY solutions\n- Storage and organization systems\n- Window treatments and textile coordination\n- Current design trends and timeless classics\n- Room makeovers and styling advice\n\nRESPONSE GUIDELINES:\n- For simple questions (color suggestions, quick tips): Provide concise 2-3 sentence answers with my friendly personality\n- For room design questions: Give detailed 1-2 paragraph responses with specific recommendations and creative ideas\n- For complex projects (whole house, major renovations): Provide comprehensive multi-paragraph guidance with step-by-step approaches\n- For budget questions: Always ask for budget range and provide options at different price points\n- For style questions: Ask about lifestyle, family size, and personal preferences before recommending\n\nI always ask clarifying questions when needed and provide actionable, specific advice with practical implementation tips. Let\'s create something beautiful together!'

    };

    // Insert all system instructions before the conversation
    messagesWithSystem = [systemMessage, languageInstruction, detailInstruction, ...messages];

    // Log language detection and parameters for monitoring
    console.log(`Detected language: ${userLanguage} for message: "${currentUserMessage.substring(0, 50)}..."`);
    console.log('Using detailed response parameters: temperature=0.8, top_p=0.9, top_k=50, repeat_penalty=1.2, num_predict=800, min_length=250');

    // Call the Ollama /api/chat endpoint with full conversation context
    const response = await fetch(`${ngrokUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3-f16-v2',
        messages: messagesWithSystem,
        stream: false,
        options: {
          temperature: 0.8,        // Balanced creativity while maintaining coherence
          top_p: 0.9,             // Good vocabulary variety without being excessive
          top_k: 50,              // Balanced word choices for natural variation
          repeat_penalty: 1.2,    // Moderate anti-repetition without being aggressive
          num_predict: -1,       // Allows longer detailed responses
          num_ctx: 16384,         // Extended context window for better understanding
          min_length: 250,        // Ensures substantial minimum length
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

