import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

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
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

