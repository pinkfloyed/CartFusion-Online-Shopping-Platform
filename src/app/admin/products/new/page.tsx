import AdminSidebar from "@/components/AdminSidebar";
import ProductForm from "@/components/ProductForm";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NewProductPage() {
  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto py-8 flex gap-6">
        <AdminSidebar />

        <div className="flex-1 bg-white/90 backdrop-blur p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            ➕ Add New Product
          </h2>
          <ProductForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
