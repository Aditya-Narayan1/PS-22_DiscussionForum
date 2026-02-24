import { NavLink, useNavigate } from 'react-router-dom';
import { useForum } from '../../context/ForumContext.jsx';
import { useState } from 'react';
import { useDebounce } from '../../hooks/index.js';

export default function Navigation() {
  const { categories, unreadCount } = useForum();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const debounced = useDebounce(query, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    if (debounced.trim()) {
      navigate(`/search?q=${encodeURIComponent(debounced.trim())}`);
      setQuery('');
    }
  };

  return (
    <div className="h-full flex flex-col px-6 py-8 text-sm">

      {/* Archive Identity */}
      <div className="mb-10">
        <NavLink to="/" className="block">
          <h2 className="text-xl font-semibold tracking-wide text-accent">
            Archive
          </h2>
          <p className="text-[var(--text-muted)] text-xs tracking-widest uppercase mt-1">
            Slytherin Engineering Order
          </p>
        </NavLink>
      </div>

      {/* Archive Query */}
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query the archives…"
          className="input-base text-sm"
        />
      </form>

      {/* Create Entry */}
      <NavLink
        to="/new"
        className="btn-primary mb-10 justify-center"
      >
        + Create Entry
      </NavLink>

      {/* Domains */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
          Domains
        </p>

        <nav className="flex flex-col gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[rgba(47,163,107,0.15)] text-accent'
                  : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
              }`
            }
          >
            ◈ All Entries
          </NavLink>

          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat.id}`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-[rgba(47,163,107,0.15)] text-accent'
                    : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="opacity-70">{cat.icon}</span>
              {cat.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Member Status */}
      <div className="border-t border-white/5 pt-6">
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
          Member Status
        </p>

        <div className="flex items-center justify-between text-[var(--text-secondary)]">
          <span>Unread Responses</span>
          <span className="text-accent font-medium">
            {unreadCount}
          </span>
        </div>
      </div>

    </div>
  );
}