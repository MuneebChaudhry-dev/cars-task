import { type Product } from '../services/api';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl flex flex-col gap-0 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full">
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center p-4">
        {product.brand && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {product.brand}
          </span>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 flex-1" title={product.description}>
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
          <p className="font-bold text-gray-900 text-xl">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
            ★ {product.rating}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse h-[320px] flex flex-col">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200" />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="h-5 bg-gray-200 rounded-full w-16" />
          <div className="h-5 bg-gray-100 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
};
