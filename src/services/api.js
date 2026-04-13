export const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products/category/vehicle");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.products;
};
