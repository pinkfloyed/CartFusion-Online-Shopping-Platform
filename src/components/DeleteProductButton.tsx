"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

type Props = { id: string };

export default function DeleteProductButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("🗑️ Product deleted successfully");
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-semibold"
    >
      <FaTrash size={14} />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
