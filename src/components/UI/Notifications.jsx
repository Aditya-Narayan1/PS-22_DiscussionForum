import { useEffect } from 'react';
import { useForum } from '../../context/ForumContext.jsx';

function Toast({ notification }) {
  const { dismissNotification } = useForum();
  useEffect(() => {
    const timer = setTimeout(() => dismissNotification(notification.id), 4000);
    return () => clearTimeout(timer);
  }, [notification.id, dismissNotification]);

  const styles = {
    success: 'border-emerald-500/30 bg-emerald-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    info: 'border-blue-500/30 bg-blue-500/10',
  };
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const iconColors = { success: 'text-emerald-400', error: 'text-red-400', info: 'text-blue-400' };
  const type = notification.type || 'info';

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`glass-card-sm flex items-center gap-3 px-4 py-3 animate-fade-up border ${styles[type]}`}
    >
      <span className={`font-bold text-sm ${iconColors[type]}`} aria-hidden="true">{icons[type]}</span>
      <span className="text-sm text-white/80">{notification.message}</span>
      <button onClick={() => dismissNotification(notification.id)} className="ml-auto text-white/30 hover:text-white/70 transition-colors" aria-label="Dismiss">✕</button>
    </div>
  );
}

export default function NotificationContainer() {
  const { notifications } = useForum();
  if (notifications.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full" aria-label="Notifications">
      {notifications.map((n) => <Toast key={n.id} notification={n} />)}
    </div>
  );
}
