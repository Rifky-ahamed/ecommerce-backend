import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ============================================
// CATEGORY API
// ============================================

// Get all categories
export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};

// Create category
export const createCategory = async (data: { name: string; description?: string }) => {
  const res = await axios.post(`${API_URL}/categories`, data);
  return res.data;
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  const res = await axios.get(`${API_URL}/categories/${id}`);
  return res.data;
};

// Update category
export const updateCategory = async (id: string, data: { name: string; description?: string }) => {
  const res = await axios.put(`${API_URL}/categories/${id}`, data);
  return res.data;
};

// Delete category
export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${API_URL}/categories/${id}`);
  return res.data;
};

// ============================================
// PRODUCT API
// ============================================

// Get paginated products
export const getProducts = async (page: number = 1, limit: number = 10) => {
  const res = await axios.get(`${API_URL}/products?page=${page}&limit=${limit}`);
  return res.data;
};

// Create product
export const createProduct = async (data: {
  name: string;
  price: number;
  stock?: string;
  categoryId?: string;
  categoryName?: string;
}) => {
  const res = await axios.post(`${API_URL}/products`, data);
  return res.data;
};

// Get product by ID
export const getProductById = async (id: string) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

// Update product
export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    price?: number;
    stock?: string;
    categoryId?: string;
    categoryName?: string; // backend will lowercase + validate
  }
) => {
  const res = await axios.put(`${API_URL}/products/${id}`, data);
  return res.data;
};

// Delete product
export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${API_URL}/products/${id}`);
  return res.data;
};
