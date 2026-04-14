import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import { SearchInput } from './SearchInput';
import { SortSelect } from './SortSelect';
import { LoadingGrid } from './LoadingGrid';
import { EmptyState } from './EmptyState';
import { ProductGrid } from './ProductGrid';

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const debouncedSearch = useDebounce<string>(searchTerm, 300);

  const { data: products, isLoading, isError } = useQuery<Product[], Error>({
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
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : filteredAndSortedProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductGrid products={filteredAndSortedProducts} />
      )}
    </div>
  );
}
