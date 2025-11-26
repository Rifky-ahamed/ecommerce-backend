"use client";
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  getCategories,
  updateProduct,
  deleteProduct,
} from "../../services/api";

type Category = { _id: string; name: string };
type Product = { _id: string; name: string; price: number; stock?: string; category?: string };

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Editing States
  const [editId, setEditId] = useState<string | null>(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const fetchProducts = async (pageNumber = page) => {
    const res = await getProducts(pageNumber, limit);
    setProducts(res.data);
    setTotalPages(res.totalPages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert("Select a category");

    if (editId) {
      // UPDATE PRODUCT
      await updateProduct(editId, {
        name: productName,
        price: Number(price),
        stock,
        categoryId,
      });
      setEditId(null);
    } else {
      // CREATE PRODUCT
      await createProduct({
        name: productName,
        price: Number(price),
        stock,
        categoryId,
      });
    }

    setProductName("");
    setPrice("");
    setStock("");
    setCategoryId("");

    fetchProducts(page);
  };

  const handleEdit = (prod: Product) => {
    setEditId(prod._id);
    setProductName(prod.name);
    setPrice(String(prod.price));
    setStock(prod.stock || "");
    setCategoryId(prod.category || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    fetchProducts(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editId ? "Update Product" : "Add Product"}
      </h1>

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
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-2">Products List</h2>

      <ul className="space-y-2">
        {products.map((prod) => (
          <li key={prod._id} className="p-2 border rounded flex justify-between">
            <div>
              {prod.name} - ${prod.price} - {prod.stock || "-"} -{" "}
              {prod.category || "No Category"}
            </div>

            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(prod)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(prod._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex gap-2 mt-4 items-center">
        <button
          className="bg-gray-300 p-2 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

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
