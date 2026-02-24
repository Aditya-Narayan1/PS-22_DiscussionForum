import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(47,163,107,0.12),transparent_60%)]" />

      {/* Floating Mist Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 animate-pulse bg-[radial-gradient(circle_at_70%_80%,rgba(203,213,225,0.08),transparent_60%)]" />

      <div className="glass-card relative z-10 p-10 max-w-lg w-full text-center">
        
        {/* Ghost 404 */}
        <div
          className="absolute inset-0 flex items-center justify-center text-[140px] font-black opacity-5 select-none pointer-events-none"
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="text-3xl font-bold mb-4 text-accent tracking-wide">
          You Have Entered a Restricted Chamber
        </h1>

        <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
          This path does not exist within the archives.  
          Either it was never created — or it has been sealed by order of the council.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            Return to the Archives
          </Link>

          <Link to="/new" className="btn-secondary">
            Open a New Entry
          </Link>
        </div>

        <div className="divider mt-10 pt-6 text-xs text-[var(--text-muted)] tracking-widest uppercase">
          Forbidden · Unindexed · Untraceable
        </div>
      </div>
    </main>
  );
}