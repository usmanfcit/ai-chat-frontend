interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="w-full mb-4 animate-fade-in">
      <div className="bg-red-900/50 border border-red-500 rounded-lg px-4 py-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-red-200 font-semibold text-sm">Error</p>
            <p className="text-red-300 text-sm mt-1">{message}</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-200 transition-colors"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

