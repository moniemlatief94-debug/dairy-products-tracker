import React from 'react';
import { useAuthStore } from '../store/authStore';
import { FiTruck, FiPackage, FiShoppingCart, FiUsers } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">مرحباً، {user?.name}! 👋</h1>
          <p className="text-gray-600 text-lg">لوحة التحكم الرئيسية لتطبيق متابعة الألبان</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <FiPackage className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">المنتجات</h3>
            <p className="text-gray-600">إدارة منتجات الألبان</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <FiTruck className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">الشاحنات</h3>
            <p className="text-gray-600">متابعة الشاحنات والتبريد</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <FiShoppingCart className="text-4xl text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">الشحنات</h3>
            <p className="text-gray-600">إدارة الشحنات والمبيعات</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
            <FiUsers className="text-4xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">المستخدمون</h3>
            <p className="text-gray-600">إدارة فريق العمل</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ميزات التطبيق</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-gray-800">إدارة المنتجات</h3>
                <p className="text-gray-600">تتبع جميع منتجات الألبان مع تواريخ الإنتاج والصلاحية</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-gray-800">مراقبة درجات الحرارة</h3>
                <p className="text-gray-600">تسجيل درجات الحرارة عند الشحن والوصول</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-gray-800">تتبع الشحنات</h3>
                <p className="text-gray-600">متابعة حالة الشحنات والمبيعات</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✅</div>
              <div>
                <h3 className="font-bold text-gray-800">قاعدة بيانات سحابية</h3>
                <p className="text-gray-600">مشاركة البيانات بأمان بين جميع المستخدمين</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
