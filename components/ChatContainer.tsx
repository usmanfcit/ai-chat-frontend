'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}

export default function ChatContainer({
  messages,
  isLoading,
  error,
  onClearError,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto"
      style={{ scrollbarGutter: 'stable' }}
    >
      {messages.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-3xl font-semibold text-gray-200 mb-2">
            AI Advisor
          </h2>
          <p className="text-gray-400 max-w-md text-base">
            How can I help you today?
          </p>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && <LoadingIndicator />}
      
      {error && <ErrorMessage message={error} onDismiss={onClearError} />}

      <div ref={messagesEndRef} />
    </div>
  );
}

