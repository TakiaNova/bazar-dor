const BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();

  // API response থেকে product array বের করা
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.products)) return result.products;

  return [];
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await response.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.categories)) return result.categories;

  return [];
}