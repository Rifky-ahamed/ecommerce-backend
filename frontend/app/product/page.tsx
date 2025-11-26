"use client";
import { useEffect, useState } from "react";
import { getProducts, createProduct, getCategories } from "../../services/api";

type Category = { _id: string; name: string };
type Product = { _id: string; name: string; price: number; stock?: string; category?: string };

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<string>(""); // Start empty
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // products per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products whenever page changes
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const fetchProducts = async (pageNumber = page) => {
    const res = await getProducts(pageNumber, limit);
    setProducts(res.data);       // Products for current page
    setTotalPages(res.totalPages); // Total pages from backend
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert("Select a category");

    await createProduct({
      name: productName,
      price: Number(price), // Convert to number
      stock,
      categoryId,
    });

    // Reset form
    setProductName("");
    setPrice(""); // Reset to empty
    setStock("");
    setCategoryId("");

    // Refetch products for current page
    fetchProducts(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          required
        />
        <input
          type="text"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          className="border p-2 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Add Product
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-2">Products List</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - ${prod.price} - {prod.stock || "-"} - {prod.category || "No Category"}
          </li>
        ))}
      </ul>

      {/* Pagination Buttons */}
      <div className="flex gap-2 mt-4 items-center">
        <button
          className="bg-gray-300 p-2 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          className="bg-gray-300 p-2 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
