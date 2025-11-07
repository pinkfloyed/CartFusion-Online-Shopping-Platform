import AdminSidebar from "@/components/AdminSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { prisma } from "@/lib/prisma";
import { FaUser } from "react-icons/fa";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto py-8 flex gap-6">
        <AdminSidebar />

        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">👥 Users</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {users.map((u) => (
              <div
                className="bg-white/90 backdrop-blur p-5 rounded-xl shadow border hover:shadow-lg transition flex items-center gap-4"
                key={u.id}
              >
                <FaUser size={28} className="text-blue-600" />

                <div>
                  <div className="font-semibold text-gray-900">
                    {u.name || u.email}
                  </div>
                  <div className="text-sm text-gray-600">{u.email}</div>

                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                    {u.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
