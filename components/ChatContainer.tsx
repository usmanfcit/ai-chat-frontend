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
      className="flex-1 overflow-y-auto px-8 py-6"
      style={{ scrollbarGutter: 'stable' }}
    >
      {messages.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-3xl font-semibold text-gray-200 mb-2">
            AI Advisor (NORA)
          </h2>
          <p className="text-gray-400 max-w-md text-base mb-6">
            How can I help you today?
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 max-w-lg">
            <p className="text-xs text-gray-400 leading-relaxed">
              💡 <span className="font-semibold text-gray-300">Tip:</span> This chat maintains full conversation context. 
              You can ask follow-up questions and reference previous messages!
            </p>
          </div>
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

