import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { fetchProducts } from '../services/api';
import { ProductCard, ProductSkeleton } from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';

export const Route = createFileRoute('/')({
  component: Dashboard,
})

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter((product) => 
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'name-desc') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, debouncedSearch, sortOption]);

  if (isError) {
    return (
      <div className="p-8 text-red-500 text-center font-semibold mt-10">
        Error fetching products. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-500 pl-3">
          Products
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search by title..." 
               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="relative min-w-[200px]">
            <select
              className="w-full appearance-none pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm cursor-pointer"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="none">Sort by...</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
         </div>
      ) : filteredAndSortedProducts.length === 0 ? (
         <div className="text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
           <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
           <p className="text-lg font-medium text-gray-900">No products found</p>
           <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
         </div>
      ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
         </div>
      )}
    </div>
  );
}
