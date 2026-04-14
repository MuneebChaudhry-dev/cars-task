import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative min-w-[200px]">
      <select
        className="w-full appearance-none pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm cursor-pointer"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        <option value="none">Sort by...</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
      <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
    </div>
  );
}
