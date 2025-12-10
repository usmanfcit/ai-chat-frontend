import { Message } from '@/types/chat';
import { ReactNode } from 'react';

interface MessageBubbleProps {
  message: Message;
}

// Parse markdown and convert to React elements
function parseMarkdown(text: string): ReactNode[] {
  const tokens: Array<{ type: 'text' | 'bold' | 'italic'; content: string }> = [];
  let i = 0;
  
  while (i < text.length) {
    // Check for bold (**text**)
    if (text.substring(i, i + 2) === '**') {
      const endIndex = text.indexOf('**', i + 2);
      if (endIndex !== -1) {
        tokens.push({
          type: 'bold',
          content: text.substring(i + 2, endIndex)
        });
        i = endIndex + 2;
        continue;
      }
    }
    
    // Check for italic (*text*) - single asterisk, not part of **
    if (text[i] === '*' && (i === 0 || text[i - 1] !== '*') && (i + 1 >= text.length || text[i + 1] !== '*')) {
      const endIndex = text.indexOf('*', i + 1);
      if (endIndex !== -1 && (endIndex + 1 >= text.length || text[endIndex + 1] !== '*')) {
        tokens.push({
          type: 'italic',
          content: text.substring(i + 1, endIndex)
        });
        i = endIndex + 1;
        continue;
      }
    }
    
    // Find next potential markdown token
    const nextBold = text.indexOf('**', i);
    const nextItalic = text.indexOf('*', i);
    
    let nextToken = text.length;
    if (nextBold !== -1 && nextItalic !== -1) {
      nextToken = Math.min(nextBold, nextItalic);
    } else if (nextBold !== -1) {
      nextToken = nextBold;
    } else if (nextItalic !== -1) {
      // Only use italic if it's not part of **
      if (nextItalic + 1 >= text.length || text[nextItalic + 1] !== '*') {
        nextToken = nextItalic;
      } else {
        nextToken = text.length;
      }
    }
    
    // Add plain text
    if (nextToken > i) {
      tokens.push({
        type: 'text',
        content: text.substring(i, nextToken)
      });
      i = nextToken;
    } else {
      // Fallback: add remaining character
      tokens.push({
        type: 'text',
        content: text[i]
      });
      i++;
    }
  }
  
  // Convert tokens to React elements
  let keyCounter = 0;
  return tokens.map((token) => {
    if (token.type === 'bold') {
      return <strong key={`md-${keyCounter++}`}>{token.content}</strong>;
    } else if (token.type === 'italic') {
      return <em key={`md-${keyCounter++}`}>{token.content}</em>;
    } else {
      return token.content;
    }
  });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const content = parseMarkdown(message.content);

  return (
    <div
      className={`w-full py-6 animate-fade-in ${
        isUser ? 'bg-gray-800' : 'bg-gray-850'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-lg font-bold ${
            isUser ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
          }`}>
            {isUser ? 'U' : 'AI'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-100 text-base leading-7 whitespace-pre-wrap break-words">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

