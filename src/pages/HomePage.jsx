import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForum } from '../context/ForumContext.jsx';
import ThreadList from '../components/Thread/ThreadList.jsx';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest Entries' },
  { value: 'popular', label: 'Most Consulted' },
  { value: 'unread', label: 'Unread First' },
];

export default function HomePage() {
  const { threads, categories } = useForum();
  const navigate = useNavigate();
  const [sort, setSort] = useState('latest');
  const [filter, setFilter] = useState('all');

  const processedThreads = useMemo(() => {
    let result = [...threads];

    if (filter === 'unread') {
      result = result.filter((t) => !t.isRead);
    }

    if (sort === 'popular') {
      result.sort((a, b) => b.views - a.views);
    } else if (sort === 'latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'unread') {
      result.sort((a, b) => {
        if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return result;
  }, [threads, sort, filter]);

  const unreadCount = threads.filter((t) => !t.isRead).length;

  return (
    <main id="main-content" className="max-w-5xl mx-auto">

      {/* Archive Header */}
      <section className="mb-12">
        <h1 className="text-3xl font-semibold text-accent tracking-wide">
          Archive Hall
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2">
          {threads.length} Entries across {categories.length} Domains
        </p>
      </section>

      {/* Controls Bar */}
      <section className="flex items-center justify-between mb-10 flex-wrap gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-base text-xs w-auto"
            aria-label="Filter entries"
          >
            <option value="all">All Entries</option>
            <option value="unread">Unread Only</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-base text-xs w-auto"
            aria-label="Sort entries"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-[var(--text-muted)] tracking-widest uppercase">
          Unread Responses: <span className="text-accent">{unreadCount}</span>
        </div>
      </section>

      {/* Entries */}
      <section>
        <ThreadList
          threads={processedThreads}
          onNewThread={() => navigate('/new')}
        />
      </section>

    </main>
  );
}