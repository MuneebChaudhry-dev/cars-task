import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'hero';
}

export function SortSelect({ value, onChange, variant = 'default' }: SortSelectProps) {
  const isHero = variant === 'hero';
  return (
    <div className="relative min-w-[200px]">
      <select
        className={`w-full appearance-none pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 transition-all cursor-pointer ${
          isHero
            ? 'bg-white/15 backdrop-blur-sm border border-white/30 text-white focus:ring-white/40 focus:bg-white/20'
            : 'bg-white border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-transparent shadow-sm'
        }`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        <option value="none" className="text-gray-900">Sort by...</option>
        <option value="price-asc" className="text-gray-900">Price: Low to High</option>
        <option value="price-desc" className="text-gray-900">Price: High to Low</option>
        <option value="name-asc" className="text-gray-900">Name: A to Z</option>
        <option value="name-desc" className="text-gray-900">Name: Z to A</option>
      </select>
      <ArrowUpDown className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isHero ? 'text-blue-300' : 'text-gray-400'}`} />
    </div>
  );
}
