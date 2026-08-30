import React, { useState, useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import apiClient from '../api/axios';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function Products() {
  const { products, setProducts, addProduct, updateProduct, deleteProduct, setLoading } = useProductStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'حليب',
    batch: '',
    manufacturingDate: '',
    expiryDate: '',
    quantity: '',
    mixingQuantity: '',
    mixingRatio: '',
    notes: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await apiClient.put(`/products/${editingId}`, formData);
        updateProduct(editingId, response.data.product);
      } else {
        const response = await apiClient.post('/products', formData);
        addProduct(response.data.product);
      }
      resetForm();
    } catch (error) {
      console.error('خطأ:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      type: product.type,
      batch: product.batch,
      manufacturingDate: product.manufacturingDate.split('T')[0],
      expiryDate: product.expiryDate.split('T')[0],
      quantity: product.quantity,
      mixingQuantity: product.mixingQuantity,
      mixingRatio: product.mixingRatio,
      notes: product.notes,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('هل تأكد من حذف هذا المنتج؟')) {
      try {
        await apiClient.delete(`/products/${id}`);
        deleteProduct(id);
      } catch (error) {
        console.error('خطأ:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'حليب',
      batch: '',
      manufacturingDate: '',
      expiryDate: '',
      quantity: '',
      mixingQuantity: '',
      mixingRatio: '',
      notes: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">إدارة المنتجات</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <FiPlus /> إضافة منتج
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="اسم المنتج"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                <option>حليب</option>
                <option>زبادي</option>
                <option>جبن</option>
                <option>قشطة</option>
                <option>آيس كريم</option>
                <option>أخرى</option>
              </select>
              <input
                type="text"
                placeholder="رقم الباتش"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={formData.manufacturingDate}
                onChange={(e) => setFormData({ ...formData, manufacturingDate: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="الكمية"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="كمية الدمج"
                value={formData.mixingQuantity}
                onChange={(e) => setFormData({ ...formData, mixingQuantity: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="نسبة الدمج"
                value={formData.mixingRatio}
                onChange={(e) => setFormData({ ...formData, mixingRatio: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="ملاحظات"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded md:col-span-2"
                rows="3"
              />
              <div className="flex gap-4 md:col-span-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                >
                  {editingId ? 'تحديث' : 'إضافة'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-right">المنتج</th>
                <th className="px-6 py-3 text-right">النوع</th>
                <th className="px-6 py-3 text-right">الباتش</th>
                <th className="px-6 py-3 text-right">الصلاحية</th>
                <th className="px-6 py-3 text-right">الكمية</th>
                <th className="px-6 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.type}</td>
                  <td className="px-6 py-4">{product.batch}</td>
                  <td className="px-6 py-4">{new Date(product.expiryDate).toLocaleDateString('ar-EG')}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
