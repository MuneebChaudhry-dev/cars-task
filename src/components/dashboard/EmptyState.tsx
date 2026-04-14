import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
      <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium text-gray-900">No products found</p>
      <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
    </div>
  );
}
