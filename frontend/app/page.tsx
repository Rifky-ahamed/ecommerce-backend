"use client";
import { useEffect, useState } from "react";
import { 
  getCategories, 
  createCategory, 
  deleteCategory, 
  updateCategory 
} from "../services/api";

type Category = {
  _id: string;
  name: string;
  description?: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update category
        await updateCategory(editingId, { name, description });
        setEditingId(null);
      } else {
        // Create category
        await createCategory({ name, description });
      }
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you suver you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err: any) {
      alert(err.message); // e.g., "Cannot delete category because products are linked to it"
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat._id);
    setName(cat.name);
    setDescription(cat.description || "");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Add / Edit Form */}
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
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Category List */}
      <ul>
        {categories.map((cat) => (
          <li key={cat._id} className="border p-2 mb-2 rounded flex justify-between items-center">
            <span>
              {cat.name} - {cat.description}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(cat)} 
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(cat._id)} 
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
