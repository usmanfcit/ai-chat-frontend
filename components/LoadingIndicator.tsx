export default function LoadingIndicator() {
  return (
    <div className="w-full py-6 bg-gray-850 animate-fade-in">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-lg font-bold bg-green-600 text-white">
            AI
          </div>
          <div className="flex-1 min-w-0 flex items-center gap-1 pt-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

