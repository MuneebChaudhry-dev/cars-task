import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'hero';
}

export function SearchInput({ value, onChange, variant = 'default' }: SearchInputProps) {
  const isHero = variant === 'hero';
  return (
    <div className="relative">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isHero ? 'text-blue-300' : 'text-gray-400'}`} />
      <input
        type="text"
        placeholder="Search by title..."
        className={`pl-10 pr-4 py-2.5 rounded-xl w-full sm:w-72 focus:outline-none focus:ring-2 transition-all ${
          isHero
            ? 'bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder:text-blue-200 focus:ring-white/40 focus:bg-white/20'
            : 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-transparent shadow-sm'
        }`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
}
