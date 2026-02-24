import { memo, useMemo } from 'react';
import ThreadCard from './ThreadCard.jsx';

const ThreadList = memo(function ThreadList({ threads, emptyMessage, onNewThread }) {
  const sorted = useMemo(() => {
    return [...threads].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [threads]);

  if (sorted.length === 0) {
    return (
      <div className="border border-white/5 rounded-xl p-12 text-center bg-[rgba(15,30,22,0.4)]">
        <h3 className="text-lg font-semibold text-accent mb-3 tracking-wide">
          The Archive Is Empty
        </h3>

        <p className="text-sm text-[var(--text-secondary)] mb-6">
          {emptyMessage || 'No entries have been recorded within this domain.'}
        </p>

        {onNewThread && (
          <button onClick={onNewThread} className="btn-primary">
            Record First Entry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-4"
      role="feed"
      aria-label="Archive entries"
    >
      {sorted.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
});

export default ThreadList;