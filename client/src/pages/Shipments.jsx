import React from 'react';
import { Link } from 'react-router-dom';

export default function Shipments() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">الشحنات والمبيعات</h1>
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">قريباً...</h2>
          <p className="text-gray-600 mb-6">سيتم إضافة ميزة إدارة الشحنات والمبيعات قريباً</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-bold">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
