# AI Advisor Chat Frontend

A modern, responsive chat application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI**: ChatGPT-style interface with clean, minimalist design
- 💬 **Conversation Context**: Full conversation history maintained throughout session
- 🔄 **Context Management**: "New chat" button to reset conversation context
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 15 App Router and React 19
- 🔄 **Loading States**: Typing indicators and smooth transitions
- ❌ **Error Handling**: Graceful error handling with user-friendly messages
- 🎯 **Type Safe**: Full TypeScript implementation with Ollama types
- 🔐 **API Proxy**: Secure CORS proxy for external API calls
- 📊 **Message Counter**: Visual feedback showing conversation length
- 💾 **Session Persistence**: Conversation maintained during active session

## Tech Stack

- **Framework**: Next.js 15.5.6
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Deployment**: Vercel / Netlify

## Project Structure

```
ai-chat-frontend/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API proxy endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main chat page
├── components/
│   ├── ChatContainer.tsx          # Chat message container
│   ├── MessageBubble.tsx          # Individual message component
│   ├── InputArea.tsx              # Message input component
│   ├── LoadingIndicator.tsx       # Typing animation
│   └── ErrorMessage.tsx           # Error display component
├── hooks/
│   └── useChat.ts                 # Chat logic and state management
├── types/
│   └── chat.ts                    # TypeScript interfaces
├── .env.local                     # Environment variables
└── package.json                   # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- An ngrok URL pointing to your AI backend

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd ai-chat-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update `NGROK_URL` with your actual ngrok URL:
     ```
     NGROK_URL=https://your-ngrok-url.ngrok-free.app
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The application communicates with Ollama's `/api/chat` endpoint through a proxy, maintaining full conversation context:

### API Route: `/api/chat`

**Request Format:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "What's the weather?" }
  ]
}
```

**Backend API Call (to Ollama):**
```json
{
  "model": "ai-advisor-v0.1-16k",
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "What's the weather?" }
  ],
  "stream": false
}
```

**Response Format:**
```json
{
  "message": {
    "role": "assistant",
    "content": "AI response text"
  },
  "done": true
}
```

### Conversation Context
- ✅ Full conversation history sent with each request
- ✅ AI can reference previous messages
- ✅ Context maintained throughout session
- ✅ "New chat" button to reset context

### Error Handling

The API route handles:
- Missing environment variables
- Network timeouts (60 seconds for longer conversations)
- API errors
- Malformed requests
- Invalid message arrays
- Response format validation
- Failed message rollback

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - `NGROK_URL`: Your ngrok URL
4. Deploy

### Netlify Deployment

1. Push your code to GitHub
2. Import project in Netlify
3. Add environment variable:
   - `NGROK_URL`: Your ngrok URL
4. Deploy

The `netlify.toml` configuration is already included.

## Customization

### Styling

Modify colors and styles in:
- `app/globals.css` - Global styles and animations
- Component files - Tailwind CSS classes

### API Configuration

Update the model or request format in:
- `app/api/chat/route.ts` - Backend API call configuration
- Requires Ollama v0.1.0+ with `/api/chat` endpoint support
- See `MIGRATION-GUIDE.md` for details on conversation context implementation

### Components

All components are modular and can be customized:
- `MessageBubble.tsx` - Message appearance
- `InputArea.tsx` - Input field behavior
- `LoadingIndicator.tsx` - Loading animation
- `ChatContainer.tsx` - Layout and scrolling

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Type Safety

The project uses TypeScript interfaces defined in `types/chat.ts` for type safety across components and API calls.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
