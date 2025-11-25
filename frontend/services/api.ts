const API_URL = "http://localhost:5000/api"; // your backend

export const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
};

export const createCategory = async (data: { name: string; description?: string }) => {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const createProduct = async (data: {
  name: string;
  price: number;
  stock?: string;
  categoryId?: string;    // optional
  categoryName?: string;  // optional
}) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Add similar methods for create/update/delete products
