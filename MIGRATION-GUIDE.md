# Migration Guide: /api/generate → /api/chat (Conversation Context)

## Overview
Successfully migrated the Next.js chat application from using Ollama's `/api/generate` (single prompts) to `/api/chat` (full conversation context).

---

## What Changed

### 1. **API Endpoint** (`app/api/chat/route.ts`)

**Before:**
- Called `NGROK_URL/api/generate`
- Sent single prompt: `{ model, prompt, stream }`
- Received: `{ response: "text" }`

**After:**
- Calls `NGROK_URL/api/chat`
- Sends full message array: `{ model, messages: [...], stream }`
- Receives: `{ message: { role, content }, done }`
- Validates response format
- Increased timeout to 60 seconds for longer conversations

### 2. **TypeScript Interfaces** (`types/chat.ts`)

**Added:**
```typescript
interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}
```

### 3. **State Management** (`hooks/useChat.ts`)

**Before:**
- Sent only the current message
- No conversation history

**After:**
- Maintains full conversation history in state
- Converts messages to Ollama format on each request
- Sends entire conversation context to API
- Rolls back failed messages
- Added `startNewConversation()` function

**Key Changes:**
```typescript
// Converts UI messages to Ollama format
const ollamaMessages: OllamaMessage[] = newMessages.map((msg) => ({
  role: msg.role,
  content: msg.content,
}));

// Sends full conversation
body: JSON.stringify({ messages: ollamaMessages })
```

### 4. **UI Components**

#### **InputArea.tsx**
- ✅ Centered text input with `text-center`
- ✅ Centered placeholder with `placeholder:text-center`
- ✅ Rotated send icon 90° with `transform rotate-90`
- ✅ Updated placeholder to "Message AI Advisor..."

#### **ChatContainer.tsx**
- ✅ Added conversation context tip on empty state
- ✅ Maintained ChatGPT-style layout

#### **page.tsx**
- ✅ Added message counter badge in header
- ✅ Added confirmation dialog for "New chat"
- ✅ Shows "New chat" button with + icon
- ✅ Disabled during loading
- ✅ Clear visual indication of conversation state

---

## Features Implemented

### ✅ Conversation Context
- Full conversation history sent with each request
- AI can reference previous messages
- Context maintained throughout session

### ✅ New Conversation Management
- "New chat" button in header (with confirmation)
- Clears all messages and context
- Resets error states
- Message counter shows conversation length

### ✅ Enhanced UX
- Centered text input (ChatGPT style)
- Rotated send button icon
- Visual feedback (message counter)
- Confirmation before clearing conversation
- Disabled state handling during loading

### ✅ Error Handling
- Validates messages array
- Response format validation
- Failed message rollback
- Extended timeout for longer conversations
- User-friendly error messages

---

## Testing the Changes

### Test Conversation Context:
1. **First message:** "What is machine learning?"
2. **Second message:** "Can you give me examples?" *(should reference ML)*
3. **Third message:** "What did I ask you first?" *(should recall first question)*

### Test New Conversation:
1. Start a conversation with several messages
2. Click "New chat" button
3. Confirm the dialog
4. Verify conversation history is cleared
5. Start fresh conversation

### Test Error States:
1. Without `NGROK_URL` configured → Shows config error
2. With invalid backend → Shows API error
3. Long conversation → Handles 60s timeout

---

## API Request/Response Examples

### Request to Frontend API:
```json
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "What did I say?" }
  ]
}
```

### Request to Ollama Backend:
```json
POST {NGROK_URL}/api/chat
{
  "model": "ai-advisor-v0.1-16k",
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "What did I say?" }
  ],
  "stream": false
}
```

### Response from Ollama:
```json
{
  "message": {
    "role": "assistant",
    "content": "You said 'Hello!'"
  },
  "done": true
}
```

---

## Breaking Changes

### ⚠️ Backend API Must Support `/api/chat`
Your Ollama backend must now support the `/api/chat` endpoint instead of `/api/generate`.

**Ollama v0.1.0+** supports this endpoint natively.

### ⚠️ Response Format Changed
- Old: `{ response: "text" }`
- New: `{ message: { role, content }, done }`

---

## Configuration

### Environment Variables
```env
NGROK_URL=https://your-ngrok-url.ngrok-free.app
```

No additional configuration required!

---

## Benefits

1. **Contextual Conversations**: AI remembers previous exchanges
2. **Better User Experience**: Natural follow-up questions work
3. **ChatGPT-like Interface**: Familiar UX patterns
4. **Proper State Management**: Full conversation tracking
5. **Error Recovery**: Failed messages don't break context
6. **Visual Feedback**: Message counter and clear states

---

## Troubleshooting

### "Messages array is required"
- Ensure you're sending the `messages` array in requests
- Check that array is not empty

### "Invalid response format from AI"
- Verify backend supports `/api/chat` endpoint
- Check Ollama version (needs v0.1.0+)
- Ensure response has `message.content` field

### Context Not Working
- Verify full conversation is being sent
- Check browser console for API errors
- Test with simple questions: "What did I ask before?"

### UI Not Centered
- Clear browser cache
- Verify Tailwind classes: `text-center`, `placeholder:text-center`
- Check for CSS conflicts

---

## Migration Checklist

- ✅ Updated API route to use `/api/chat`
- ✅ Changed request format to messages array
- ✅ Updated TypeScript interfaces
- ✅ Modified state management for conversation context
- ✅ Added conversation reset functionality
- ✅ Centered input field text
- ✅ Rotated send button icon
- ✅ Added message counter
- ✅ Enhanced error handling
- ✅ Updated documentation

---

## Next Steps

### Optional Enhancements:
1. **Persistent Storage**: Save conversations to localStorage
2. **Multiple Conversations**: Sidebar with conversation list
3. **Export Conversations**: Download as JSON/TXT
4. **System Prompts**: Add custom system messages
5. **Streaming Support**: Real-time token streaming
6. **Token Counter**: Display usage statistics
7. **Conversation Titles**: Auto-generate conversation names

---

## Support

For issues or questions:
1. Check browser console for errors
2. Verify `NGROK_URL` is correctly set
3. Test backend API directly with curl
4. Review error messages in the UI

---

**Migration completed successfully! 🚀**

