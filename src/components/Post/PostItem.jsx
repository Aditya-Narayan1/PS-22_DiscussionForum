import { memo, useState, useCallback } from 'react';
import { useForum } from '../../context/ForumContext.jsx';
import Avatar from '../UI/Avatar.jsx';
import { formatRelativeTime } from '../../utils/index.js';
import clsx from 'clsx';

const PostItem = memo(function PostItem({ post, onReply, depth = 0 }) {
  const { getUser, votePost } = useForum();
  const [collapsed, setCollapsed] = useState(false);
  const author = getUser(post.authorId);
  const isCurrentUser = post.authorId === 'currentUser';
  const hasChildren = post.children && post.children.length > 0;

  const handleVote = useCallback((dir) => votePost(post.id, dir), [post.id, votePost]);

  return (
    <div className={clsx('flex gap-0', depth > 0 && 'ml-4 sm:ml-8')} id={`post-${post.id}`} aria-label={`Reply by ${author?.name}`}>
      {/* Thread line */}
      {hasChildren && (
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-px mr-4 mt-12 mb-0 flex-shrink-0 relative group"
          style={{ background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }}
          aria-label={collapsed ? 'Expand replies' : 'Collapse replies'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <div className="absolute inset-0 group-hover:bg-cyan-400/40 transition-colors rounded-full" />
        </button>
      )}
      {!hasChildren && depth > 0 && <div className="w-px mr-4 flex-shrink-0" />}

      <div className="flex-1 min-w-0">
        {/* Post card */}
        <div className={clsx(
          'glass-card-sm p-4 mb-3',
          !post.isRead && 'border-l-2 border-cyan-500/40',
          isCurrentUser && 'border-violet-500/20'
        )}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar user={author} size="sm" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-white/90">
                  {author?.name}
                  {isCurrentUser && <span className="ml-1.5 text-xs text-cyan-400 font-normal font-body">(you)</span>}
                </span>
                <time className="text-xs text-white/25 font-mono" dateTime={post.createdAt}>
                  {formatRelativeTime(post.createdAt)}
                </time>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap break-words mb-3">
            {post.body}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 -ml-1" role="group" aria-label="Post actions">
            <button
              onClick={() => handleVote(1)}
              className={clsx('btn-ghost text-xs', post.userVote === 1 && 'text-cyan-400 bg-cyan-400/10')}
              aria-label={`Upvote`} aria-pressed={post.userVote === 1}
            >▲</button>

            <span className={clsx('text-xs font-mono font-medium px-1.5',
              post.votes > 0 ? 'text-cyan-400' : post.votes < 0 ? 'text-white/25' : 'text-white/40'
            )} aria-live="polite">
              {post.votes}
            </span>

            <button
              onClick={() => handleVote(-1)}
              className={clsx('btn-ghost text-xs', post.userVote === -1 && 'text-white/40 bg-white/5')}
              aria-label="Downvote" aria-pressed={post.userVote === -1}
            >▼</button>

            {depth < 4 && (
              <button onClick={() => onReply(post.id)} className="btn-ghost text-xs ml-2 text-white/40 hover:text-cyan-400" aria-label={`Reply to ${author?.name}`}>
                ↩ Reply
              </button>
            )}

            {hasChildren && (
              <button onClick={() => setCollapsed((c) => !c)} className="btn-ghost text-xs ml-auto text-white/30 hover:text-white/60"
                aria-expanded={!collapsed} aria-label={collapsed ? `Expand replies` : 'Collapse'}>
                {collapsed ? `▶ ${post.children.length} ${post.children.length === 1 ? 'reply' : 'replies'}` : '▼ Collapse'}
              </button>
            )}
          </div>
        </div>

        {/* Nested replies */}
        {hasChildren && !collapsed && (
          <div className="animate-slide-down" role="list">
            {post.children.map((child) => (
              <div key={child.id} role="listitem">
                <PostItem post={child} onReply={onReply} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}

        {hasChildren && collapsed && (
          <button onClick={() => setCollapsed(false)} className="text-xs text-white/25 hover:text-cyan-400 ml-4 mb-3 transition-colors font-mono">
            [{post.children.length} {post.children.length === 1 ? 'reply' : 'replies'} hidden]
          </button>
        )}
      </div>
    </div>
  );
});

export default PostItem;
