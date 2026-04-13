

export function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 hover:shadow-lg transition-shadow bg-white h-full relative overflow-hidden group">
      {product.brand && (
        <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-md z-10">
          {product.brand}
        </span>
      )}
      <div className="h-44 w-full bg-gray-50 flex items-center justify-center p-2 rounded-md">
        <img src={product.thumbnail} alt={product.title} className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="w-full mt-auto flex flex-col pt-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-lg text-gray-800 leading-tight flex-1" title={product.title}>
            {product.title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2" title={product.description}>
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4 border-t border-gray-100 pt-3">
          <p className="font-bold text-gray-900 text-xl">${product.price.toFixed(2)}</p>
          <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded">
             ★ {product.rating}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-4 animate-pulse bg-white h-[320px]">
      <div className="h-48 bg-gray-200 rounded w-full"></div>
      <div className="w-full mt-auto flex flex-col gap-2 pt-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mt-2"></div>
      </div>
    </div>
  );
};
