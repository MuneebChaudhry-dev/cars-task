export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand?: string;
  thumbnail: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products/category/vehicle");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.products;
};
