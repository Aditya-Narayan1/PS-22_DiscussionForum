import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForum } from '../../context/ForumContext.jsx';
import LoadingSpinner from '../UI/LoadingSpinner.jsx';
import { parseTags } from '../../utils/index.js';

const VALIDATORS = {
  title: (v) => { if (!v?.trim()) return 'Title is required.'; if (v.trim().length < 10) return 'At least 10 characters.'; if (v.trim().length > 300) return 'Max 300 characters.'; return null; },
  categoryId: (v) => { if (!v) return 'Please select a category.'; return null; },
  body: (v) => { if (!v?.trim()) return 'Content is required.'; if (v.trim().length < 30) return 'At least 30 characters.'; return null; },
};

function Field({ label, id, error, required, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-display font-medium text-white/70 mb-1.5">
        {label}{required && <span className="text-cyan-400 ml-1" aria-label="required">*</span>}
      </label>
      {hint && <p className="text-xs text-white/30 mb-2">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

export default function NewThreadForm() {
  const { categories, submitThread, loading } = useForum();
  const navigate = useNavigate();
  const [values, setValues] = useState({ title: '', categoryId: '', body: '', tagsRaw: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }, [errors]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (VALIDATORS[field]) setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](values[field]) }));
  }, [values]);

  const validate = () => {
    const newErrors = {};
    Object.keys(VALIDATORS).forEach((f) => { const e = VALIDATORS[f](values[f]); if (e) newErrors[f] = e; });
    setErrors(newErrors);
    setTouched({ title: true, categoryId: true, body: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError('');
    try {
      const thread = await submitThread({ title: values.title, body: values.body, categoryId: values.categoryId, tags: parseTags(values.tagsRaw) });
      navigate(`/thread/${thread.id}`);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit. Please try again.');
    }
  };

  const inputClass = (field) => `input-base ${touched[field] && errors[field] ? 'border-red-500/50 ring-2 ring-red-500/20' : ''}`;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Create new thread" className="space-y-6">
      <Field label="Category" id="cat" error={touched.categoryId ? errors.categoryId : null} required>
        <select id="cat" value={values.categoryId} onChange={(e) => handleChange('categoryId', e.target.value)} onBlur={() => handleBlur('categoryId')} className={inputClass('categoryId')}>
          <option value="">Select a category…</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
      </Field>

      <Field label="Thread Title" id="title" error={touched.title ? errors.title : null} required hint="Write a clear, descriptive title.">
        <div className="relative">
          <input id="title" type="text" value={values.title} onChange={(e) => handleChange('title', e.target.value)} onBlur={() => handleBlur('title')} placeholder="What's on your mind?" className={`${inputClass('title')} pr-16`} maxLength={310} />
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono ${values.title.length > 280 ? 'text-red-400' : 'text-white/25'}`}>{values.title.length}/300</span>
        </div>
      </Field>

      <Field label="Content" id="body" error={touched.body ? errors.body : null} required hint="Provide context and what you hope to discuss.">
        <textarea id="body" value={values.body} onChange={(e) => handleChange('body', e.target.value)} onBlur={() => handleBlur('body')} placeholder="Share your thoughts in detail…" rows={10} className={`${inputClass('body')} resize-y`} />
        <div className="flex justify-end mt-1">
          <span className="text-xs font-mono text-white/25">{values.body.length.toLocaleString()} chars</span>
        </div>
      </Field>

      <Field label="Tags" id="tags" hint="Comma-separated, max 5. E.g., 'react, performance'">
        <input id="tags" type="text" value={values.tagsRaw} onChange={(e) => handleChange('tagsRaw', e.target.value)} placeholder="react, performance, ux" className="input-base" />
        {values.tagsRaw && (
          <div className="flex gap-1.5 flex-wrap mt-2">
            {parseTags(values.tagsRaw).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">#{tag}</span>
            ))}
          </div>
        )}
      </Field>

      {submitError && (
        <div role="alert" className="text-sm text-red-400 glass-card-sm px-4 py-3 border border-red-500/20">
          {submitError}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary" disabled={loading.submitting} aria-busy={loading.submitting}>
          {loading.submitting ? <><LoadingSpinner size="sm" /> Posting…</> : 'Post Thread'}
        </button>
        <button type="button" onClick={() => navigate(-1)} className="btn-secondary" disabled={loading.submitting}>Cancel</button>
      </div>
    </form>
  );
}
