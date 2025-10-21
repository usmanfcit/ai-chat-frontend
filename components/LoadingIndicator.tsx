export default function LoadingIndicator() {
  return (
    <div className="flex w-full mb-6 justify-center animate-fade-in">
      <div className="w-full max-w-[90%] md:max-w-[85%] rounded-3xl px-6 py-5 bg-gradient-to-br from-gray-700 via-gray-750 to-gray-800 shadow-2xl">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/10 backdrop-blur-sm">
            🤖
          </div>
          <div className="flex gap-2 pt-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

