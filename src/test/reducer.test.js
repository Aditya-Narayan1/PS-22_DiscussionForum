import { describe, it, expect } from 'vitest';
import { ACTIONS } from '../context/ForumContext.jsx';

function forumReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: { ...state.loading, [action.key]: action.value } };
    case ACTIONS.ADD_THREAD:
      return { ...state, threads: [action.thread, ...state.threads], loading: { ...state.loading, submitting: false } };
    case ACTIONS.ADD_POST:
      return { ...state, posts: [...state.posts, action.post], loading: { ...state.loading, submitting: false } };
    case ACTIONS.UPDATE_POST_VOTE: {
      const { postId, direction } = action;
      return {
        ...state,
        posts: state.posts.map((p) => {
          if (p.id !== postId) return p;
          const prevVote = p.userVote;
          const newVote = prevVote === direction ? null : direction;
          const delta = newVote === null ? -direction : prevVote === null ? direction : direction * 2;
          return { ...p, votes: p.votes + delta, userVote: newVote };
        }),
      };
    }
    case ACTIONS.MARK_THREAD_READ:
      return { ...state, threads: state.threads.map((t) => t.id === action.threadId ? { ...t, isRead: true, views: t.views + 1 } : t) };
    case ACTIONS.DISMISS_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter((n) => n.id !== action.id) };
    default:
      return state;
  }
}

const baseState = {
  threads: [{ id: 't1', title: 'Test', isRead: false, views: 10 }],
  posts: [{ id: 'p1', threadId: 't1', votes: 5, userVote: null }],
  loading: { submitting: false },
  notifications: [{ id: 1, message: 'A' }, { id: 2, message: 'B' }],
};

describe('forumReducer', () => {
  it('SET_LOADING updates immutably', () => {
    const next = forumReducer(baseState, { type: ACTIONS.SET_LOADING, key: 'submitting', value: true });
    expect(next.loading.submitting).toBe(true);
    expect(next).not.toBe(baseState);
  });

  it('ADD_THREAD prepends thread', () => {
    const thread = { id: 't2', title: 'New' };
    const next = forumReducer(baseState, { type: ACTIONS.ADD_THREAD, thread });
    expect(next.threads[0]).toEqual(thread);
    expect(next.threads).toHaveLength(2);
  });

  it('ADD_THREAD does not mutate original', () => {
    const original = [...baseState.threads];
    forumReducer(baseState, { type: ACTIONS.ADD_THREAD, thread: { id: 't2' } });
    expect(baseState.threads).toEqual(original);
  });

  it('ADD_POST appends post', () => {
    const post = { id: 'p2', body: 'Reply' };
    const next = forumReducer(baseState, { type: ACTIONS.ADD_POST, post });
    expect(next.posts[1]).toEqual(post);
  });

  it('UPDATE_POST_VOTE upvotes from neutral', () => {
    const next = forumReducer(baseState, { type: ACTIONS.UPDATE_POST_VOTE, postId: 'p1', direction: 1 });
    expect(next.posts[0].votes).toBe(6);
    expect(next.posts[0].userVote).toBe(1);
  });

  it('UPDATE_POST_VOTE removes vote if same direction', () => {
    const state = { ...baseState, posts: [{ ...baseState.posts[0], userVote: 1, votes: 6 }] };
    const next = forumReducer(state, { type: ACTIONS.UPDATE_POST_VOTE, postId: 'p1', direction: 1 });
    expect(next.posts[0].votes).toBe(5);
    expect(next.posts[0].userVote).toBeNull();
  });

  it('UPDATE_POST_VOTE switches from up to down', () => {
    const state = { ...baseState, posts: [{ ...baseState.posts[0], userVote: 1, votes: 6 }] };
    const next = forumReducer(state, { type: ACTIONS.UPDATE_POST_VOTE, postId: 'p1', direction: -1 });
    expect(next.posts[0].votes).toBe(4);
    expect(next.posts[0].userVote).toBe(-1);
  });

  it('MARK_THREAD_READ marks and increments views', () => {
    const next = forumReducer(baseState, { type: ACTIONS.MARK_THREAD_READ, threadId: 't1' });
    expect(next.threads[0].isRead).toBe(true);
    expect(next.threads[0].views).toBe(11);
  });

  it('DISMISS_NOTIFICATION removes by id', () => {
    const next = forumReducer(baseState, { type: ACTIONS.DISMISS_NOTIFICATION, id: 1 });
    expect(next.notifications).toHaveLength(1);
    expect(next.notifications[0].id).toBe(2);
  });
});
