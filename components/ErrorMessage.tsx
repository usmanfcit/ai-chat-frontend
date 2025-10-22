interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="w-full py-4 bg-red-900/20 border-t border-b border-red-800/50 animate-fade-in">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-lg">⚠️</span>
          <div className="flex-1 min-w-0">
            <p className="text-red-300 text-sm">{message}</p>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

