import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useForum } from '../../context/ForumContext.jsx';
import Avatar from '../UI/Avatar.jsx';
import { formatRelativeTime, truncate, formatCount } from '../../utils/index.js';

const ThreadCard = memo(function ThreadCard({ thread }) {
  const { getUser, getCategory, getPostsByThread } = useForum();

  const author = getUser(thread.authorId);
  const category = getCategory(thread.categoryId);
  const posts = getPostsByThread(thread.id);
  const lastPost = posts[posts.length - 1];

  const lastActivity = lastPost
    ? formatRelativeTime(lastPost.createdAt)
    : formatRelativeTime(thread.createdAt);

  return (
    <article
      className={`border border-white/5 rounded-xl p-6 bg-[rgba(15,30,22,0.45)] transition-all duration-200 hover:border-[rgba(47,163,107,0.4)]`}
      aria-label={`Archive Entry: ${thread.title}`}
    >
      <div className="flex gap-5">

        {/* Author Sigil */}
        <div className="flex-shrink-0 pt-1">
          <Avatar user={author} size="md" />
        </div>

        <div className="flex-1 min-w-0">

          {/* Entry Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">

            <div className="flex items-center gap-3 flex-wrap text-xs tracking-widest uppercase">

              {thread.isPinned && (
                <span className="px-2 py-0.5 border border-emerald-700/40 text-emerald-400 rounded-sm">
                  Archived Priority
                </span>
              )}

              {!thread.isRead && (
                <span className="px-2 py-0.5 border border-emerald-600/40 text-emerald-300 rounded-sm">
                  Unread
                </span>
              )}

              {category && (
                <Link
                  to={`/category/${category.id}`}
                  className="px-2 py-0.5 border border-white/10 text-[var(--text-secondary)] rounded-sm hover:border-emerald-600/40 hover:text-accent transition-colors"
                >
                  {category.name}
                </Link>
              )}

            </div>

            <time
              className="text-xs text-[var(--text-muted)]"
              dateTime={thread.createdAt}
            >
              Recorded {formatRelativeTime(thread.createdAt)}
            </time>

          </div>

          {/* Entry Title */}
          <h2 className="text-lg font-semibold text-white mb-2 leading-snug">
            <Link
              to={`/thread/${thread.id}`}
              className="hover:text-accent transition-colors"
            >
              {thread.title}
            </Link>
          </h2>

          {/* Entry Summary */}
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            {truncate(thread.body, 130)}
          </p>

          {/* Entry Footer */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">

            <span>
              Authored by <span className="text-[var(--text-primary)] font-medium">{author?.name}</span>
            </span>

            <span>
              {formatCount(posts.length)} Responses
            </span>

            <span>
              {formatCount(thread.views)} Consultations
            </span>

            <span>
              Last Activity {lastActivity}
            </span>

          </div>

          {/* Tags */}
          {thread.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {thread.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 border border-white/10 rounded-sm text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </article>
  );
});

export default ThreadCard;