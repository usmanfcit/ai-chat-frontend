import { useState, useCallback } from 'react';
import { Message, ChatResponse, ApiError, OllamaMessage } from '@/types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    // Clear any existing errors
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Convert messages to Ollama format (full conversation context)
      const ollamaMessages: OllamaMessage[] = newMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send entire conversation history to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: ollamaMessages }),
      });

      const data: ChatResponse | ApiError = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const chatResponse = data as ChatResponse;

      // Add AI response
      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: chatResponse.message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      
      // Remove the user message that failed
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const startNewConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearError,
    clearMessages,
    startNewConversation,
  };
}

