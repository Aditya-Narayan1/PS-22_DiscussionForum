export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function buildPostTree(posts) {
  const map = {};
  const roots = [];
  posts.forEach((p) => { map[p.id] = { ...p, children: [] }; });
  posts.forEach((p) => {
    if (p.parentId && map[p.parentId]) map[p.parentId].children.push(map[p.id]);
    else roots.push(map[p.id]);
  });
  const sortByDate = (items) => {
    items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    items.forEach((item) => sortByDate(item.children));
    return items;
  };
  return sortByDate(roots);
}

export function getAvatarGradient(str) {
  const gradients = [
    'from-cyan-400 to-blue-500',
    'from-violet-400 to-purple-600',
    'from-pink-400 to-rose-500',
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-blue-400 to-indigo-600',
    'from-fuchsia-400 to-pink-600',
    'from-teal-400 to-cyan-600',
  ];
  const index = (str?.charCodeAt(0) ?? 0) % gradients.length;
  return gradients[index];
}

export function truncate(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function parseTags(str) {
  return str.split(',').map((t) => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean).slice(0, 5);
}

export function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
