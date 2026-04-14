export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand?: string;
  thumbnail: string;
  category?: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchVehicles = async (): Promise<Product[]> => {
  const response = await fetch('https://dummyjson.com/products/category/vehicle');
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.products;
};

export const fetchAllProducts = async (
  page: number,
  limit: number
): Promise<PaginatedProducts> => {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
