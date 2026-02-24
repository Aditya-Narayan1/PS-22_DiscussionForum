import { useState, useRef, useEffect } from 'react';
import { useForum } from '../../context/ForumContext.jsx';
import Avatar from '../UI/Avatar.jsx';
import LoadingSpinner from '../UI/LoadingSpinner.jsx';

export default function ReplyForm({ threadId, parentId, onCancel, autoFocus = false }) {
  const { submitPost, loading, getUser, currentUserId } = useForum();
  const currentUser = getUser(currentUserId);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) textareaRef.current.focus();
  }, [autoFocus]);

  const validate = () => {
    if (!body.trim()) { setError('Reply cannot be empty.'); return false; }
    if (body.trim().length < 10) { setError('Reply must be at least 10 characters.'); return false; }
    setError(''); return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    try {
      await submitPost({ threadId, parentId, body });
      setBody('');
    } catch (err) {
      setSubmitError(err.message || 'Failed to post. Please try again.');
    }
  };

  const isOverLimit = body.length > 5000;

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4 animate-fade-up" noValidate aria-label={parentId ? 'Reply to comment' : 'Post a reply'}>
      <div className="flex gap-3">
        <Avatar user={currentUser} size="sm" />
        <div className="flex-1 min-w-0">
          <label htmlFor={`reply-${parentId || 'root'}`} className="sr-only">Your reply</label>
          <textarea
            id={`reply-${parentId || 'root'}`}
            ref={textareaRef}
            value={body}
            onChange={(e) => { setBody(e.target.value); if (error && e.target.value.trim().length >= 10) setError(''); }}
            onBlur={validate}
            placeholder="Share your perspective…"
            rows={4}
            className={`input-base resize-none ${error ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`}
            disabled={loading.submitting}
            aria-invalid={!!error}
          />
          <div className="flex justify-between mt-1">
            {error ? <p role="alert" className="text-xs text-red-400">{error}</p> : <span />}
            <span className={`text-xs font-mono ${isOverLimit ? 'text-red-400' : 'text-white/25'}`}>{body.length}/5000</span>
          </div>
          {submitError && <p role="alert" className="text-xs text-red-400 mt-2">{submitError}</p>}
          <div className="flex gap-2 mt-3">
            <button type="submit" className="btn-primary" disabled={loading.submitting || isOverLimit || !body.trim()} aria-busy={loading.submitting}>
              {loading.submitting ? <><LoadingSpinner size="sm" /> Posting…</> : 'Post Reply'}
            </button>
            {onCancel && <button type="button" onClick={onCancel} className="btn-ghost" disabled={loading.submitting}>Cancel</button>}
          </div>
        </div>
      </div>
    </form>
  );
}
