import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex w-full mb-6 animate-fade-in ${
        isUser ? 'justify-center' : 'justify-center'
      }`}
    >
      <div
        className={`w-full max-w-[90%] md:max-w-[85%] rounded-3xl px-6 py-5 shadow-2xl transition-all duration-300 hover:shadow-3xl ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white'
            : 'bg-gradient-to-br from-gray-700 via-gray-750 to-gray-800 text-gray-50'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/10 backdrop-blur-sm">
            {isUser ? '👤' : '🤖'}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words text-center">
              {message.content}
            </p>
            <p className={`text-xs mt-3 text-center ${isUser ? 'text-blue-100' : 'text-gray-300'}`}>
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

