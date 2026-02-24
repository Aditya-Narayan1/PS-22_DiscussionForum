import { describe, it, expect } from 'vitest';
import { formatRelativeTime, buildPostTree, truncate, formatCount, parseTags, generateId, getAvatarGradient } from '../utils/index.js';

describe('formatRelativeTime', () => {
  it('returns just now for recent times', () => {
    expect(formatRelativeTime(new Date(Date.now() - 30000).toISOString())).toBe('just now');
  });
  it('returns minutes', () => {
    expect(formatRelativeTime(new Date(Date.now() - 600000).toISOString())).toBe('10m ago');
  });
  it('returns hours', () => {
    expect(formatRelativeTime(new Date(Date.now() - 3 * 3600000).toISOString())).toBe('3h ago');
  });
  it('returns days', () => {
    expect(formatRelativeTime(new Date(Date.now() - 5 * 86400000).toISOString())).toBe('5d ago');
  });
});

describe('buildPostTree', () => {
  it('returns root posts as top level', () => {
    const posts = [
      { id: 'p1', parentId: null, createdAt: '2024-01-01T10:00:00Z' },
      { id: 'p2', parentId: null, createdAt: '2024-01-01T11:00:00Z' },
    ];
    const tree = buildPostTree(posts);
    expect(tree).toHaveLength(2);
    expect(tree[0].children).toHaveLength(0);
  });

  it('nests children under parents', () => {
    const posts = [
      { id: 'p1', parentId: null, createdAt: '2024-01-01T10:00:00Z' },
      { id: 'p2', parentId: 'p1', createdAt: '2024-01-01T11:00:00Z' },
      { id: 'p3', parentId: 'p1', createdAt: '2024-01-01T12:00:00Z' },
    ];
    const tree = buildPostTree(posts);
    expect(tree).toHaveLength(1);
    expect(tree[0].children).toHaveLength(2);
  });

  it('sorts children chronologically', () => {
    const posts = [
      { id: 'p1', parentId: null, createdAt: '2024-01-01T10:00:00Z' },
      { id: 'p3', parentId: 'p1', createdAt: '2024-01-01T13:00:00Z' },
      { id: 'p2', parentId: 'p1', createdAt: '2024-01-01T11:00:00Z' },
    ];
    const tree = buildPostTree(posts);
    expect(tree[0].children[0].id).toBe('p2');
  });

  it('handles orphaned posts', () => {
    const posts = [{ id: 'p1', parentId: 'nonexistent', createdAt: '2024-01-01T10:00:00Z' }];
    const tree = buildPostTree(posts);
    expect(tree).toHaveLength(1);
  });
});

describe('truncate', () => {
  it('returns unchanged if under limit', () => { expect(truncate('hello', 10)).toBe('hello'); });
  it('truncates and adds ellipsis', () => { expect(truncate('hello world', 5)).toMatch(/…$/); });
  it('uses default 150 chars', () => { expect(truncate('a'.repeat(200)).length).toBeLessThanOrEqual(152); });
});

describe('formatCount', () => {
  it('returns plain number under 1000', () => { expect(formatCount(999)).toBe('999'); });
  it('formats thousands', () => { expect(formatCount(1200)).toBe('1.2k'); });
  it('formats large numbers', () => { expect(formatCount(10000)).toBe('10.0k'); });
});

describe('parseTags', () => {
  it('splits by comma', () => { expect(parseTags('react, vue, angular')).toEqual(['react', 'vue', 'angular']); });
  it('converts spaces to hyphens', () => { expect(parseTags('hello world')).toContain('hello-world'); });
  it('limits to 5 tags', () => { expect(parseTags('a,b,c,d,e,f,g')).toHaveLength(5); });
  it('filters empty strings', () => { expect(parseTags('a,,b')).toEqual(['a', 'b']); });
});

describe('generateId', () => {
  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
  it('includes prefix', () => { expect(generateId('t-').startsWith('t-')).toBe(true); });
});

describe('getAvatarGradient', () => {
  it('returns a tailwind gradient class', () => {
    const gradient = getAvatarGradient('AV');
    expect(gradient).toContain('from-');
    expect(gradient).toContain('to-');
  });
  it('is deterministic for same input', () => {
    expect(getAvatarGradient('MH')).toBe(getAvatarGradient('MH'));
  });
});
