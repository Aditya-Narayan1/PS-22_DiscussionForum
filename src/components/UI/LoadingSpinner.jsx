export default function LoadingSpinner({ size = 'md', label = 'Loading...' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <div className="flex items-center gap-2" role="status" aria-label={label}>
      <svg className={`${sizes[size]} animate-spin`} fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="url(#spinGrad)" strokeWidth="3" />
        <path className="opacity-80" fill="url(#spinGrad2)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        <defs>
          <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="spinGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#4f8dff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <LoadingSpinner size="lg" label={message} />
      <p className="text-white/40 text-sm animate-pulse">{message}</p>
    </div>
  );
}

export function EmptyState({ icon = '💬', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 animate-fade-in">
      <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-3xl">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg text-white/80 mb-1">{title}</h3>
        {description && <p className="text-white/40 text-sm max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 animate-fade-in">
      <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-3xl">⚠️</div>
      <div>
        <h3 className="font-display text-lg text-red-400 mb-1">Something went wrong</h3>
        <p className="text-white/40 text-sm">{message}</p>
      </div>
      {onRetry && <button onClick={onRetry} className="btn-secondary">Try again</button>}
    </div>
  );
}
