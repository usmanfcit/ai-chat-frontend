export default function LoadingIndicator() {
  return (
    <div className="flex w-full mb-4 justify-start animate-fade-in">
      <div className="max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-tl-sm shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg">
            🤖
          </div>
          <div className="flex gap-1 pt-1">
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

