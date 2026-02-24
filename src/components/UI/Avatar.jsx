import { getAvatarGradient } from '../../utils/index.js';

const sizeMap = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };

export default function Avatar({ user, size = 'sm' }) {
  if (!user) return null;
  const gradient = getAvatarGradient(user.avatar || user.name);
  return (
    <div
      className={`${sizeMap[size]} bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold font-mono flex-shrink-0 select-none shadow-lg`}
      aria-label={`Avatar for ${user.name}`}
      role="img"
    >
      {(user.avatar || user.name).slice(0, 2).toUpperCase()}
    </div>
  );
}
