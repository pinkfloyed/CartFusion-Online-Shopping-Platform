import AdminSidebar from "@/components/AdminSidebar";
import DeleteProductButton from "@/components/DeleteProductButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <ProtectedRoute adminOnly>
      <div className="flex gap-6 container mx-auto py-8">
        <AdminSidebar />

        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              🛒 Products
            </h2>

            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-lg transition"
            >
              <FaPlus size={14} />
              Add Product
            </Link>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.length === 0 && (
              <p className="text-gray-500">No products yet.</p>
            )}

            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white/80 backdrop-blur border border-gray-200 p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">
                      ${(p.price / 100).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">Stock: {p.stock}</p>

                  <p className="text-xs text-gray-400">
                    Category: {p.category || "—"}
                  </p>
                </div>

                <div className="flex justify-end items-center gap-4 mt-4">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    Edit
                  </Link>

                  <DeleteProductButton id={p.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
