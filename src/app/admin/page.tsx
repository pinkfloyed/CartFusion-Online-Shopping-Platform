"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage products, users, and orders from one centralized dashboard
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* PRODUCTS */}
        <Link
          href="/admin/products"
          className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          <div className="text-4xl mb-4">
            <FaBox />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
          <p className="text-indigo-100">Create, edit, or delete products</p>
        </Link>

        {/* ORDERS */}
        <Link
          href="/admin/orders"
          className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          <div className="text-4xl mb-4">
            <FaShoppingCart />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Manage Orders</h2>
          <p className="text-blue-100">View and update orders</p>
        </Link>

        {/* USERS */}
        <Link
          href="/admin/users"
          className="bg-gradient-to-br from-green-600 to-green-500 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          <div className="text-4xl mb-4">
            <FaUsers />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Manage Users</h2>
          <p className="text-green-100">View user accounts and roles</p>
        </Link>
      </div>
    </div>
  );
}
