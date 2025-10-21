interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="w-full mb-6 animate-fade-in flex justify-center">
      <div className="w-full max-w-[90%] md:max-w-[85%] bg-gradient-to-br from-red-900/60 to-red-800/60 backdrop-blur-sm border border-red-500/50 rounded-3xl px-6 py-4 flex items-start justify-between shadow-2xl">
        <div className="flex items-start gap-4 flex-1">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1 text-center">
            <p className="text-red-200 font-semibold text-base">Error</p>
            <p className="text-red-300 text-sm md:text-base mt-2">{message}</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-200 transition-all duration-200 ml-4 text-xl"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

