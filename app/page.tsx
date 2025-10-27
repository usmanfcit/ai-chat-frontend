'use client';

import { useChat } from '@/hooks/useChat';
import ChatContainer from '@/components/ChatContainer';
import InputArea from '@/components/InputArea';

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearError, startNewConversation } = useChat();

  const handleNewConversation = () => {
    if (messages.length > 0) {
      const confirmed = window.confirm('Start a new conversation? This will clear the current chat history and conversation context.');
      if (confirmed) {
        startNewConversation();
      }
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-center px-8 py-3 relative">
          {/* AI Advisor - Left Corner */}
          <div className="absolute left-8 flex items-center gap-3">
            <h1 className="text-lg font-semibold text-white">AI Advisor [DEMO]</h1>
            {messages.length > 0 && (
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </span>
            )}
          </div>
          
          {/* New Chat Button - Center */}
          {messages.length > 0 && (
            <button
              onClick={handleNewConversation}
              disabled={isLoading}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Start new conversation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
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
