import { useState } from 'react';
import { Heart, Copy, RefreshCw, SlidersHorizontal, MoreVertical } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

export function DashboardTitle({ title }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <button
          onClick={() => setFavorited((f) => !f)}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <Heart
            size={18}
            className={favorited ? 'text-red-500 fill-red-500' : 'text-gray-400'}
          />
        </button>
        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
          <Copy size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>1d ago</span>
        <IconButton icon={RefreshCw} label="Refresh" />
        <IconButton icon={SlidersHorizontal} label="Filters" />
        <IconButton icon={MoreVertical} label="More options" />
      </div>
    </div>
  );
}
