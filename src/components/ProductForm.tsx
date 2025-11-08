"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  initial?: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    stock?: number;
    image?: string;
    category?: string;
  };
};

export default function ProductForm({ initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name || "",
    slug: initial?.slug || "",
    description: initial?.description || "",
    price: initial?.price ? (initial.price / 100).toFixed(2) : "",
    stock: initial?.stock?.toString() || "0",
    category: initial?.category || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(initial?.id);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e: any) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append("price", Math.round(Number(form.price) * 100).toString());
      if (imageFile) formData.append("image", imageFile);

      const url = isEditing
        ? `/api/products/${initial?.id}`
        : `/api/products`;

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (!res.ok) throw new Error("Failed to save product");

      toast.success(
        isEditing
          ? "✅ Product updated successfully!"
          : "✅ Product created successfully!"
      );

      router.push("/admin/products");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      encType="multipart/form-data"
      className="bg-white p-6 rounded-xl shadow-sm space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          step="0.01"
          placeholder="Price USD"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          type="number"
          placeholder="Stock"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded"
        />
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-3 rounded min-h-28"
      />

      <div>
        <label className="block font-medium mb-2">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {initial?.image && (
          <img
            src={initial.image}
            className="h-24 rounded border mt-3 object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
      >
        {loading
          ? "Saving..."
          : isEditing
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}
