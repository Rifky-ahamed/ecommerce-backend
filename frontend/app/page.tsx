"use client";


import { useEffect, useState } from "react";
import { getCategories, createCategory } from "../services/api";

type Category = {
  _id: string;
  name: string;
  description?: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory({ name, description });
    setName("");
    setDescription("");
    fetchCategories();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </form>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id} className="border p-2 mb-2 rounded">
            {cat.name} - {cat.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
