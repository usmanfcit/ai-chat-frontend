'use client';

import { useChat } from '@/hooks/useChat';
import ChatContainer from '@/components/ChatContainer';
import InputArea from '@/components/InputArea';

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearError, clearMessages } = useChat();

  return (
    <main className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-white">AI Advisor</h1>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              New chat
            </button>
          )}
        </div>
      </header>

      {/* Chat Container */}
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        error={error}
        onClearError={clearError}
      />

      {/* Input Area */}
      <InputArea onSendMessage={sendMessage} disabled={isLoading} />
    </main>
  );
}
