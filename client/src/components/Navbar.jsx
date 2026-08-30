import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gradient-to-l from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🥛</span>
            تطبيق متابعة الألبان
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link to="/products" className="hover:text-blue-200 transition">
                  المنتجات
                </Link>
                <Link to="/trucks" className="hover:text-blue-200 transition">
                  الشاحنات
                </Link>
                <Link to="/shipments" className="hover:text-blue-200 transition">
                  الشحنات
                </Link>
                <div className="flex items-center gap-3 ml-6 pl-6 border-l border-blue-400">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
                  >
                    <FiLogOut /> تسجيل خروج
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && user && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/products"
              className="block hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              المنتجات
            </Link>
            <Link
              to="/trucks"
              className="block hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              الشاحنات
            </Link>
            <Link
              to="/shipments"
              className="block hover:text-blue-200 transition py-2"
              onClick={() => setIsOpen(false)}
            >
              الشحنات
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded w-full justify-end"
            >
              <FiLogOut /> تسجيل خروج
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
