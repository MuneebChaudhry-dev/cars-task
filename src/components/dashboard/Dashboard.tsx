import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import { Navbar } from '../Navbar';
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
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 font-semibold text-lg">Failed to load products</p>
            <p className="text-red-400 text-sm mt-1">Please check your connection and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold tracking-tight mb-1">Vehicle Listings</h1>
          <p className="text-blue-200 text-sm">
            {isLoading ? 'Loading inventory...' : `${filteredAndSortedProducts.length} vehicle${filteredAndSortedProducts.length !== 1 ? 's' : ''} available`}
          </p>

          {/* Filters inline in header */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <SearchInput value={searchTerm} onChange={setSearchTerm} variant="hero" />
            <SortSelect value={sortOption} onChange={setSortOption} variant="hero" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingGrid />
        ) : filteredAndSortedProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductGrid products={filteredAndSortedProducts} />
        )}
      </div>
    </div>
  );
}
