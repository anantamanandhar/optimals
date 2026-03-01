import { Search, Keyboard, HelpCircle, User } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

export function TopHeader() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
      {/* Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Start typing to search"
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1">
        <IconButton icon={Keyboard} label="Keyboard shortcuts" />
        <IconButton icon={HelpCircle} label="Help" />
        <button className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-semibold flex items-center justify-center hover:bg-teal-700 transition-colors">
          A
        </button>
      </div>
    </header>
  );
}
