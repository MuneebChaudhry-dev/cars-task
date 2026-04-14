import { Car } from 'lucide-react';

export type TabId = 'vehicles' | 'all';

interface CategoryTabsProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export function CategoryTabs({ activeTab, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 bg-white/15 backdrop-blur-sm border border-white/30 p-1 rounded-xl">
      <button
        onClick={() => onChange('vehicles')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          activeTab === 'vehicles'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        <Car className="w-4 h-4" />
        Vehicles
      </button>
      <button
        onClick={() => onChange('all')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          activeTab === 'all'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
        </svg>
        All Products
      </button>
    </div>
  );
}
