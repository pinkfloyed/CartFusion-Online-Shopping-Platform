"use client";

import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; 

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 text-white">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          CartFusion
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
          <Link href="/contact" className="hover:text-yellow-300">Contact</Link>
          {session?.user?.role !== "admin" && (
            <Link href="/cart" className="hover:text-yellow-300">Cart</Link>
          )}

          {/* Admin Panel */}
          {session?.user?.role === "admin" && (
            <Link href="/admin" className="hover:text-yellow-300">Admin</Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* User Dropdown */}
          {session ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="font-medium hover:text-yellow-300"
              >
                {session.user?.name || "User"}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border rounded-lg shadow-lg w-40">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-yellow-300">Login</Link>
              <Link href="/register" className="hover:text-yellow-300">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex flex-col space-y-2 p-4">
            <Link href="/" onClick={toggleMenu} className="hover:text-yellow-300">Home</Link>
            <Link href="/about" onClick={toggleMenu} className="hover:text-yellow-300">About</Link>
            <Link href="/contact" onClick={toggleMenu} className="hover:text-yellow-300">Contact</Link>
            {session?.user?.role !== "admin" && (
              <Link href="/cart" onClick={toggleMenu} className="hover:text-yellow-300">Cart</Link>
            )}
            {session?.user?.role === "admin" && (
              <Link href="/admin" onClick={toggleMenu} className="hover:text-yellow-300">Admin</Link>
            )}
            {/* Dark mode toggle */}
            <button
              onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); toggleMenu(); }}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            {session ? (
              <>
                <Link href="/profile" onClick={toggleMenu} className="hover:text-yellow-300">Profile</Link>
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); toggleMenu(); }}
                  className="text-left hover:text-yellow-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={toggleMenu} className="hover:text-yellow-300">Login</Link>
                <Link href="/register" onClick={toggleMenu} className="hover:text-yellow-300">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
