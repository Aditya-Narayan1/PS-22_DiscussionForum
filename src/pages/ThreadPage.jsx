import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForum } from '../context/ForumContext.jsx';
import PostTree from '../components/Post/PostTree.jsx';
import ReplyForm from '../components/Form/ReplyForm.jsx';
import Avatar from '../components/UI/Avatar.jsx';
import { LoadingState, EmptyState } from '../components/UI/LoadingSpinner.jsx';
import { formatRelativeTime, formatDate, formatCount } from '../utils/index.js';

export default function ThreadPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { getThread, getUser, getCategory, getPostsByThread, markThreadRead, loading } = useForum();
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showRootReply, setShowRootReply] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); markThreadRead(threadId); }, 600);
    return () => clearTimeout(timer);
  }, [threadId, markThreadRead]);

  const thread = getThread(threadId);
  const author = getUser(thread?.authorId);
  const category = getCategory(thread?.categoryId);
  const posts = useMemo(() => getPostsByThread(threadId), [threadId, getPostsByThread]);

  const handleReply = useCallback((parentId) => {
    setReplyingTo(parentId); setShowRootReply(false);
    setTimeout(() => document.getElementById(`reply-form-${parentId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  }, []);

  const handleRootReply = () => {
    setShowRootReply(true); setReplyingTo(null);
    setTimeout(() => document.getElementById('root-reply-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  };

  if (isLoading) return <LoadingState message="Loading discussion…" />;
  if (!thread) return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-16">
      <EmptyState icon="🔍" title="Thread not found" action={<Link to="/" className="btn-primary">Back Home</Link>} />
    </main>
  );

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          <li><Link to="/" className="text-white/30 hover:text-cyan-400 transition-colors">Discussions</Link></li>
          {category && (<><li className="text-white/15" aria-hidden="true">/</li><li><Link to={`/category/${category.id}`} className="text-white/30 hover:text-cyan-400 transition-colors">{category.icon} {category.name}</Link></li></>)}
          <li className="text-white/15" aria-hidden="true">/</li>
          <li className="text-white/50 truncate max-w-xs" aria-current="page">{thread.title}</li>
        </ol>
      </nav>

      <article aria-labelledby="thread-title">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {thread.isPinned && <span className="badge bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs">📌 Pinned</span>}
            {category && <Link to={`/category/${category.id}`} className={`badge text-xs ${category.color}`}>{category.icon} {category.name}</Link>}
          </div>

          <h1 id="thread-title" className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            {thread.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <Avatar user={author} size="md" />
            <div>
              <p className="font-display font-semibold text-sm text-white/80">{author?.name}</p>
              <p className="text-xs text-white/30 font-mono">
                <time dateTime={thread.createdAt}>{formatDate(thread.createdAt)}</time>
                {' · '}{formatCount(thread.views)} views{' · '}{posts.length} {posts.length === 1 ? 'reply' : 'replies'}
              </p>
            </div>
          </div>

          {thread.tags?.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {thread.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300/70 border border-cyan-500/15 font-mono">#{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* Thread body */}
        <div className="glass-card p-6 mb-8">
          <div className="text-white/70 leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base">
            {thread.body}
          </div>
          <div className="flex items-center gap-3 mt-6 pt-4 divider">
            <button onClick={handleRootReply} className="btn-primary">↩ Reply</button>
            <button onClick={() => navigate(-1)} className="btn-ghost text-white/40">← Back</button>
          </div>
        </div>
      </article>

      {/* Replies */}
      <section aria-labelledby="replies-heading">
        <h2 id="replies-heading" className="font-display text-lg font-bold text-white/80 mb-6">
          {posts.length > 0 ? `${posts.length} ${posts.length === 1 ? 'Reply' : 'Replies'}` : 'Discussion'}
        </h2>

        {showRootReply && (
          <div id="root-reply-form" className="mb-6">
            <ReplyForm threadId={threadId} parentId={null} onCancel={() => setShowRootReply(false)} autoFocus />
          </div>
        )}

        <PostTree posts={posts} threadId={threadId} onReply={handleReply} />

        {replyingTo && (
          <div id={`reply-form-${replyingTo}`} className="mt-6 ml-8">
            <p className="text-xs text-white/25 mb-2 font-mono">
              replying to comment…{' '}
              <button onClick={() => setReplyingTo(null)} className="text-cyan-400 hover:text-cyan-300 underline">cancel</button>
            </p>
            <ReplyForm threadId={threadId} parentId={replyingTo} onCancel={() => setReplyingTo(null)} autoFocus />
          </div>
        )}

        {!showRootReply && !replyingTo && (
          <div className="mt-8 pt-6 divider">
            <button onClick={handleRootReply} className="btn-secondary">↩ Add a Reply</button>
          </div>
        )}
      </section>
    </main>
  );
}
