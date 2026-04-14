import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchVehicles, fetchAllProducts, type Product } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Navbar } from '../Navbar';
import { SearchInput } from './SearchInput';
import { SortSelect } from './SortSelect';
import { LoadingGrid } from './LoadingGrid';
import { EmptyState } from './EmptyState';
import { ProductGrid } from './ProductGrid';
import { CategoryTabs, type TabId } from './CategoryTabs';
import { Pagination } from './Pagination';

const PAGE_LIMIT = 12;

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('vehicles');
  const [page, setPage] = useState(1);
  const [mobileItems, setMobileItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const debouncedSearch = useDebounce<string>(searchTerm, 300);
  const isMobile = useIsMobile();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ── Vehicles query (no pagination needed) ──────────────────────────────────
  const vehiclesQuery = useQuery<Product[]>({
    queryKey: ['products', 'vehicles'],
    queryFn: fetchVehicles,
    enabled: activeTab === 'vehicles',
    staleTime: 5 * 60 * 1000,
  });

  // ── All Products query (paginated) ─────────────────────────────────────────
  const allProductsQuery = useQuery({
    queryKey: ['products', 'all', page],
    queryFn: () => fetchAllProducts(page, PAGE_LIMIT),
    enabled: activeTab === 'all',
    staleTime: 5 * 60 * 1000,
  });

  // ── Accumulate items for mobile infinite scroll ────────────────────────────
  useEffect(() => {
    if (activeTab === 'all' && isMobile && allProductsQuery.data) {
      setMobileItems((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const fresh = allProductsQuery.data!.products.filter(
          (p) => !existingIds.has(p.id)
        );
        return fresh.length ? [...prev, ...fresh] : prev;
      });
    }
  }, [allProductsQuery.data, activeTab, isMobile]);

  // ── IntersectionObserver — triggers next page on mobile ───────────────────
  const loadMore = useCallback(() => {
    if (!allProductsQuery.isFetching && allProductsQuery.data) {
      const loaded = mobileItems.length;
      const total = allProductsQuery.data.total;
      if (loaded < total) setPage((p) => p + 1);
    }
  }, [allProductsQuery.isFetching, allProductsQuery.data, mobileItems.length]);

  useEffect(() => {
    if (!isMobile || activeTab !== 'all') return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isMobile, activeTab, loadMore]);

  // ── Tab change: reset everything ──────────────────────────────────────────
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setPage(1);
    setMobileItems([]);
    setSearchTerm('');
    setSortOption('none');
  };

  // ── Desktop page change (scroll to top) ───────────────────────────────────
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Resolve which products to display ─────────────────────────────────────
  const rawProducts: Product[] =
    activeTab === 'vehicles'
      ? (vehiclesQuery.data ?? [])
      : isMobile
      ? mobileItems
      : (allProductsQuery.data?.products ?? []);

  const total = activeTab === 'all' ? (allProductsQuery.data?.total ?? 0) : 0;
  const totalPages = Math.ceil(total / PAGE_LIMIT);
  const isLoading =
    activeTab === 'vehicles' ? vehiclesQuery.isLoading : allProductsQuery.isLoading && page === 1;
  const isError =
    activeTab === 'vehicles' ? vehiclesQuery.isError : allProductsQuery.isError;

  // ── Filter + sort (client-side, on current page's items) ──────────────────
  const filteredAndSortedProducts = useMemo(() => {
    let result = rawProducts.filter((p) =>
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if (sortOption === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortOption === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortOption === 'name-asc') result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOption === 'name-desc') result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    return result;
  }, [rawProducts, debouncedSearch, sortOption]);

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

  const itemCount = activeTab === 'vehicles'
    ? filteredAndSortedProducts.length
    : total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">
                {activeTab === 'vehicles' ? 'Vehicle Listings' : 'All Products'}
              </h1>
              <p className="text-blue-200 text-sm">
                {isLoading
                  ? 'Loading inventory...'
                  : `${itemCount} item${itemCount !== 1 ? 's' : ''} available`}
              </p>
            </div>
            <CategoryTabs activeTab={activeTab} onChange={handleTabChange} />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
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
          <>
            <ProductGrid products={filteredAndSortedProducts} />

            {/* Desktop Pagination */}
            {activeTab === 'all' && !isMobile && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {/* Mobile Infinite Scroll sentinel */}
            {activeTab === 'all' && isMobile && (
              <div ref={sentinelRef} className="flex justify-center py-8">
                {allProductsQuery.isFetching && mobileItems.length > 0 && (
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading more...
                  </div>
                )}
                {mobileItems.length >= total && total > 0 && (
                  <p className="text-gray-400 text-sm">You've seen everything!</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
