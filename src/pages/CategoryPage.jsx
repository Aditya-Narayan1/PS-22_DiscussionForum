import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForum } from '../context/ForumContext.jsx';
import ThreadList from '../components/Thread/ThreadList.jsx';
import { EmptyState } from '../components/UI/LoadingSpinner.jsx';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { getCategory, getThreadsByCategory } = useForum();
  const category = getCategory(categoryId);
  const threads = useMemo(() => getThreadsByCategory(categoryId), [categoryId, getThreadsByCategory]);

  if (!category) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState icon="🔍" title="Category not found" action={<Link to="/" className="btn-primary">Back Home</Link>} />
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link to="/" className="text-white/30 hover:text-cyan-400 transition-colors">Discussions</Link></li>
          <li className="text-white/15" aria-hidden="true">/</li>
          <li className="text-white/60" aria-current="page">{category.name}</li>
        </ol>
      </nav>

      <header className="mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              {category.icon}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">{category.name}</h1>
              <p className="text-white/40 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <button onClick={() => navigate('/new', { state: { categoryId } })} className="btn-primary flex-shrink-0">
            + New Thread
          </button>
        </div>
        <div className="flex gap-4 mt-4 text-sm text-white/30 font-mono">
          <span>{threads.length} threads</span>
          <span>{threads.filter((t) => !t.isRead).length} unread</span>
        </div>
      </header>

      <ThreadList threads={threads} onNewThread={() => navigate('/new', { state: { categoryId } })} emptyMessage={`No threads in ${category.name} yet.`} />
    </main>
  );
}
