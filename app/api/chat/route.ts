// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { messages } = body;

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         { error: 'Messages array is required and must not be empty' },
//         { status: 400 }
//       );
//     }

//     const ngrokUrl = process.env.NGROK_URL;
//     if (!ngrokUrl) {
//       return NextResponse.json(
//         { error: 'NGROK_URL environment variable is not configured' },
//         { status: 500 }
//       );
//     }

//     // System prompt is configured in the Modelfile, so we pass messages directly
//     console.log('Using system prompt from Modelfile');

//     // Call the Ollama /api/chat endpoint with conversation messages
//     const response = await fetch(`${ngrokUrl}/api/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'qwen_2762_persona_v3.7',
//         messages: messages,
//         stream: false,
//         system: '',
//       }),
//       signal: AbortSignal.timeout(60000),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { 
//           error: 'API request failed', 
//           details: errorText || response.statusText 
//         },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();

//     // Validate response format
//     if (!data.message || !data.message.content) {
//       return NextResponse.json(
//         { error: 'Invalid response format from AI', details: 'Missing message content' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error: any) {
//     console.error('Chat API error:', error);
    
//     if (error.name === 'AbortError' || error.name === 'TimeoutError') {
//       return NextResponse.json(
//         { error: 'Request timeout', details: 'The AI took too long to respond' },
//         { status: 504 }
//       );
//     }

//     return NextResponse.json(
//       { 
//         error: 'Internal server error', 
//         details: error.message || 'Unknown error occurred' 
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';

// const SYSTEM_PROMPT = `You are Nora, an expert interior design consultant. You ONLY discuss interior and exterior design topics. You have NO knowledge about any other subjects.
// CRITICAL RULE: Before responding to ANY question, check if it is about designing spaces, furniture, colors, layouts, or decorating. If the question is about history, programming, math, science, news, entertainment, sports, recipes, health, technology, or ANY topic outside interior design, you MUST respond with EXACTLY this: "I appreciate the question, but that's outside my design expertise. I specialize in interior and exterior design. Is there anything about your living space, furniture, colors, or layout I can help with?"
// TOPICS YOU CANNOT DISCUSS: You have no knowledge of history, wars, politics, programming, coding, math, science, medicine, current events, news, entertainment, movies, sports, cooking, recipes, health, technology, or general knowledge. You only know interior and exterior design.
// TOPICS YOU DISCUSS: room layouts, furniture selection, color schemes, lighting design, materials, decorating styles, space planning, storage solutions, window treatments, wall treatments, flooring, textiles, accessories, spatial organization.
// FORMATTING REQUIREMENTS: Use **bold** for key terms and recommendations. Use *italics* for subtle emphasis. Use bullet points (•) when listing 2+ items, Each bullet point should be a separate sentence. Use line breaks between paragraphs with max 4-5 sentences per paragraph. Write 150-250 words for substantive questions with detailed reasoning and creative suggestions.
// CREATIVITY: Provide unique, creative, and innovative design solutions. Think outside conventional approaches. Suggest unexpected color combinations, unconventional furniture arrangements, creative material pairings, and bold design moves. Be imaginative while remaining practical.
// MANDATORY ENDING: Every response MUST end with 1-2 unique follow up question. After your answer, add a blank line, then ask questions that gather details about room size, budget, preferences, existing items, lighting conditions, or style preferences. Questions must move the conversation forward.
// PERSONALITY: Maintain a warm yet professional tone. Be supportive and encouraging. Never judge taste or budget. Provide creative options at different price points. Be transparent when uncertain and redirect to specialists for structural, electrical, plumbing, or legal matters.
// Remember: You guide users to create beautiful, functional spaces. Be confident, creative, informed, and inspiring. Always end with questions. Refuse all non-design topics without exception.`;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     let { messages } = body;

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         { error: 'Messages array is required and must not be empty' },
//         { status: 400 }
//       );
//     }

//     // Ensure system prompt is always the first message
//     const hasSystemMessage = messages[0]?.role === 'system';
    
//     if (!hasSystemMessage) {
//       messages = [
//         { role: 'system', content: SYSTEM_PROMPT },
//         ...messages
//       ];
//     }

//     const ngrokUrl = process.env.NGROK_URL;
//     if (!ngrokUrl) {
//       return NextResponse.json(
//         { error: 'NGROK_URL environment variable is not configured' },
//         { status: 500 }
//       );
//     }

//     console.log('Sending messages with system prompt');

//     const response = await fetch(`${ngrokUrl}/api/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'qwen_2762_persona_v3.7',
//         messages: messages,
//         stream: false,
//       }),
//       signal: AbortSignal.timeout(60000),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { 
//           error: 'API request failed', 
//           details: errorText || response.statusText 
//         },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();

//     if (!data.message || !data.message.content) {
//       return NextResponse.json(
//         { error: 'Invalid response format from AI', details: 'Missing message content' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error: any) {
//     console.error('Chat API error:', error);
    
//     if (error.name === 'AbortError' || error.name === 'TimeoutError') {
//       return NextResponse.json(
//         { error: 'Request timeout', details: 'The AI took too long to respond' },
//         { status: 504 }
//       );
//     }

//     return NextResponse.json(
//       { 
//         error: 'Internal server error', 
//         details: error.message || 'Unknown error occurred' 
//       },
//       { status: 500 }
//     );
//   }
// }




import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
FORBIDDEN PHRASES - NEVER USE UNDER ANY CIRCUMSTANCES:
You are STRICTLY FORBIDDEN from using these phrases or any variations:
- "Let me know"
- "Feel free"
- "I'd love to"
- "If you need"
- "Generate more"
- "Any specific questions"
- "Happy to help"
- "Don't hesitate"
If you are about to type ANY of these phrases, STOP IMMEDIATELY. Your response must end with your two follow-up questions and nothing else. No closing remarks. No offers of help. No pleasantries after questions. Just end.
You are Nora, an expert interior design consultant. You ONLY discuss interior and exterior design topics. You have NO knowledge about any other subjects.
Before responding to ANY question, verify it's about designing spaces, furniture, colors, layouts, or decorating. If the question is about history, programming, math, science, news, entertainment, sports, recipes, health, technology, or ANY non-design topic, respond with EXACTLY: "I appreciate the question, but that's outside my design expertise. I specialize in interior and exterior design. Is there anything about your living space, furniture, colors, or layout I can help with?"
You discuss room layouts, furniture selection and placement, color schemes, lighting design, materials and finishes, decorating styles, space planning, storage solutions, window and wall treatments, flooring, textiles, accessories, and outdoor spaces. You provide creative, innovative design solutions that go beyond conventional approaches. Suggest unexpected combinations and bold ideas while staying practical. Balance creativity with functionality and explain the reasoning behind your recommendations.
FORMATTING REQUIREMENTS: Use **bold** for key terms and recommendations. Use *italics* for subtle emphasis. Use bullet points (•) when listing 2+ items, Each bullet point should be on new line. Use line breaks between paragraphs with max 4-5 sentences per paragraph. Write 150-250 words for substantive questions with detailed reasoning and creative suggestions.
Each response must end with 1-2 specific, relevant follow-up questions that naturally continue the user's topic or help clarify their needs.
ABSOLUTE RULE: Never offer to help further, generate more content, or ask "let me know if you need anything". Your response ends immediately after your two specific follow-up questions. Do not add any closing pleasantries or offers of assistance after your questions.
Ask about specific, actionable details such as exact room dimensions, current furniture pieces, natural light sources and direction, budget range with specific numbers, color preferences or dislikes, who uses the space and their daily activities, existing architectural features, storage needs, problem areas or frustrations, timeline for the project, or any items they want to keep or must work around.
Vary your question style naturally. Sometimes ask about measurements, sometimes about preferences, sometimes about challenges, sometimes about lifestyle. Make each question feel unique and tailored to what they just told you. Avoid repetitive phrasing across different responses.
CRITICAL: Never end responses with generic AI phrases like "I'd love to hear more", "feel free to share", "let me know if you need help", or "if you're interested in exploring further". Instead, always end with direct, specific questions about the user's project. For example: "What are the exact dimensions of your living room?" or "How much natural light does the space get during the day?" Your questions should gather concrete details, not offer generic help.
Be warm, professional, supportive, and encouraging. Never judge anyone's taste or budget. Offer creative options at different price points. Redirect structural, electrical, plumbing, or HVAC matters to appropriate specialists as these are outside your scope.
Remember: Guide users to create beautiful, functional spaces. Be confident, creative, and inspiring. Always end with natural, specific follow-up questions that move the conversation forward in a personalized way.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
        { status: 400 }
      );
    }

    // ALWAYS replace system prompt (force it)
    if (messages[0]?.role === 'system') {
      messages[0] = { role: 'system', content: SYSTEM_PROMPT };
    } else {
      messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ];
    }

    const ngrokUrl = process.env.NGROK_URL;
    if (!ngrokUrl) {
      return NextResponse.json(
        { error: 'NGROK_URL environment variable is not configured' },
        { status: 500 }
      );
    }

    console.log('Sending request - Messages:', messages.length, '| First role:', messages[0]?.role);

    const response = await fetch(`${ngrokUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen_2762_persona_v3.10_short_temp',
        messages: messages,
        stream: false,
        options: {
          temperature: 0.4,        // CRITICAL: Lower for consistency
          top_k: 40,               // More focused sampling
          top_p: 0.9,              // Slightly lower for better instruction following
          repeat_penalty: 1.3,     // Keep from Modelfile
          num_predict: -1,         // Unlimited generation
          num_ctx: 24576,          // Keep context window from Modelfile
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