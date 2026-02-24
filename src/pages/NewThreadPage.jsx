import { Link } from 'react-router-dom';
import NewThreadForm from '../components/Form/NewThreadForm.jsx';

export default function NewThreadPage() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link to="/" className="text-white/30 hover:text-cyan-400 transition-colors">Discussions</Link></li>
          <li className="text-white/15" aria-hidden="true">/</li>
          <li className="text-white/60" aria-current="page">New Thread</li>
        </ol>
      </nav>

      <header className="mb-8 pb-6 divider">
        <h1 className="font-display text-2xl font-bold text-white mb-2">
          Start a <span className="text-gradient-cyan">Discussion</span>
        </h1>
        <p className="text-white/40 text-sm">Share a question, idea, or topic. Be clear and specific.</p>
      </header>

      {/* Guidelines glass card */}
      <div className="glass-card p-4 mb-8 border-cyan-500/10" style={{ background: 'rgba(0,212,255,0.03)' }}>
        <h2 className="font-display font-semibold text-white/60 text-xs mb-2 uppercase tracking-wider">Community Guidelines</h2>
        <ul className="text-xs text-white/35 space-y-1">
          <li>· Be respectful and constructive in your discussion</li>
          <li>· Search before posting to avoid duplicates</li>
          <li>· Choose the most relevant category</li>
          <li>· Add context and background to your question</li>
        </ul>
      </div>

      <NewThreadForm />
    </main>
  );
}
