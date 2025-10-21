import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex w-full mb-4 animate-fade-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-sm'
            : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-tl-sm'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg font-semibold">
            {isUser ? '👤' : '🤖'}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
            <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

