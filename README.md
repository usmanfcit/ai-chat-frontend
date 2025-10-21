# AI Advisor Chat Frontend

A modern, responsive chat application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI**: Dark theme with gradient backgrounds and smooth animations
- 💬 **Real-time Chat**: Interactive chat interface with message history
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 15 App Router and React 19
- 🔄 **Loading States**: Typing indicators and smooth transitions
- ❌ **Error Handling**: Graceful error handling with user-friendly messages
- 🎯 **Type Safe**: Full TypeScript implementation
- 🔐 **API Proxy**: Secure CORS proxy for external API calls

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

The application communicates with an external AI API through a proxy endpoint:

### API Route: `/api/chat`

**Request Format:**
```json
{
  "prompt": "Your message here"
}
```

**Backend API Call:**
```json
{
  "model": "ai-advisor-v0.1-16k",
  "prompt": "Your message here",
  "stream": false
}
```

**Response Format:**
```json
{
  "response": "AI response text"
}
```

### Error Handling

The API route handles:
- Missing environment variables
- Network timeouts (30 seconds)
- API errors
- Malformed requests

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
