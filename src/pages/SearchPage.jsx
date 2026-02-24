import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForum } from '../context/ForumContext.jsx';
import ThreadList from '../components/Thread/ThreadList.jsx';
import { EmptyState } from '../components/UI/LoadingSpinner.jsx';
import { useDebounce } from '../hooks/index.js';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debouncedQuery = useDebounce(query, 300);
  const { threads } = useForum();

  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return [];
    return threads.filter((t) => t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q) || t.tags?.some((tag) => tag.includes(q)));
  }, [debouncedQuery, threads]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) setSearchParams({ q: val }); else setSearchParams({});
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link to="/" className="text-white/30 hover:text-cyan-400 transition-colors">Discussions</Link></li>
          <li className="text-white/15" aria-hidden="true">/</li>
          <li className="text-white/60" aria-current="page">Search</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-4">
          Search <span className="text-gradient-violet">Discussions</span>
        </h1>
        <form role="search">
          <label htmlFor="search-input" className="sr-only">Search discussions</label>
          <input id="search-input" type="search" value={query} onChange={handleChange} placeholder="Search by title, content, or tag…" className="input-base text-base" autoFocus aria-describedby="search-summary" />
        </form>
      </header>

      <div id="search-summary" aria-live="polite" className="mb-4">
        {debouncedQuery && (
          <p className="text-sm text-white/30 font-mono">
            {results.length > 0 ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${debouncedQuery}"` : `No results for "${debouncedQuery}"`}
          </p>
        )}
      </div>

      {!debouncedQuery ? (
        <EmptyState icon="⌕" title="Start searching" description="Enter keywords to search all discussions and tags." />
      ) : results.length === 0 ? (
        <EmptyState icon="🔭" title="No results found" description="Try different keywords or browse by category." action={<Link to="/" className="btn-secondary">Browse All</Link>} />
      ) : (
        <ThreadList threads={results} />
      )}
    </main>
  );
}
