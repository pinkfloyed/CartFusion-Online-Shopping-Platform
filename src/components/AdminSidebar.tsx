"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBox, FaHome, FaPlus, FaShoppingCart, FaUsers } from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Overview", icon: <FaHome /> },
    { href: "/admin/products", label: "Products", icon: <FaBox /> },
    { href: "/admin/products/new", label: "Add Product", icon: <FaPlus /> },
    { href: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { href: "/admin/users", label: "Users", icon: <FaUsers /> },
    { href: "/admin/reviews", label: "Reviews", icon: <FaUsers /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-sm border-r p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-700">
        Admin Panel
      </h3>

      <nav className="flex flex-col gap-2">
        {links.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition 
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
