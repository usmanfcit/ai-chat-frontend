'use client';

import { useChat } from '@/hooks/useChat';
import ChatContainer from '@/components/ChatContainer';
import InputArea from '@/components/InputArea';

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearError, clearMessages } = useChat();

  return (
    <main className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 shadow-lg flex justify-center">
        <div className="max-w-5xl w-full px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-xl shadow-lg">
              🤖
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Advisor</h1>
              <p className="text-xs text-gray-400">Powered by ai-advisor-v0.1-16k</p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-gray-700"
            >
              Clear Chat
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
