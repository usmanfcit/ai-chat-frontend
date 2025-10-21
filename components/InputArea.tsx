import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function InputArea({ onSendMessage, disabled }: InputAreaProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !disabled) {
      onSendMessage(trimmedInput);
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 flex justify-center">
      <div className="max-w-5xl w-full flex gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "Waiting for response..." : "Type your message... (Shift+Enter for new line)"}
            disabled={disabled}
            rows={1}
            className="w-full bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-2xl px-6 py-4 pr-12 text-base md:text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed resize-none max-h-40 overflow-y-auto shadow-xl transition-all duration-300"
            style={{ minHeight: '60px' }}
          />
          <div className="absolute right-3 bottom-3 text-xs text-gray-400">
            {input.length}/2000
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 shadow-2xl hover:shadow-3xl hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-2xl"
        >
          <span className="hidden sm:inline">Send</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

