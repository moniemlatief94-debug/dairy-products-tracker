import React, { useState, useEffect } from 'react';
import { useTruckStore } from '../store/truckStore';
import apiClient from '../api/axios';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function Trucks() {
  const { trucks, setTrucks, addTruck, updateTruck, deleteTruck, setLoading } = useTruckStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    truckNumber: '',
    type: 'شركة',
    companyName: '',
    coolingStatus: true,
    hasRefrigeratorSeal: true,
    temperatureAtShipment: '',
    temperatureAtArrival: '',
    notes: '',
  });

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/trucks');
      setTrucks(response.data);
    } catch (error) {
      console.error('خطأ في جلب الشاحنات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await apiClient.put(`/trucks/${editingId}`, formData);
        updateTruck(editingId, response.data.truck);
      } else {
        const response = await apiClient.post('/trucks', formData);
        addTruck(response.data.truck);
      }
      resetForm();
    } catch (error) {
      console.error('خطأ:', error);
    }
  };

  const handleEdit = (truck) => {
    setFormData(truck);
    setEditingId(truck._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('هل تأكد من حذف هذه الشاحنة؟')) {
      try {
        await apiClient.delete(`/trucks/${id}`);
        deleteTruck(id);
      } catch (error) {
        console.error('خطأ:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      truckNumber: '',
      type: 'شركة',
      companyName: '',
      coolingStatus: true,
      hasRefrigeratorSeal: true,
      temperatureAtShipment: '',
      temperatureAtArrival: '',
      notes: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">إدارة الشاحنات</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <FiPlus /> إضافة شاحنة
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'تعديل الشاحنة' : 'إضافة شاحنة جديدة'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="رقم الشاحنة"
                value={formData.truckNumber}
                onChange={(e) => setFormData({ ...formData, truckNumber: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                <option>شركة</option>
                <option>مبيعات</option>
              </select>
              <input
                type="text"
                placeholder="اسم الشركة"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <div className="flex items-center gap-2">
                <label className="font-bold">التبريد مناسب:</label>
                <input
                  type="checkbox"
                  checked={formData.coolingStatus}
                  onChange={(e) => setFormData({ ...formData, coolingStatus: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-bold">مشمع الثلاجة:</label>
                <input
                  type="checkbox"
                  checked={formData.hasRefrigeratorSeal}
                  onChange={(e) => setFormData({ ...formData, hasRefrigeratorSeal: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
              <input
                type="number"
                placeholder="درجة الحرارة عند الشحن"
                value={formData.temperatureAtShipment}
                onChange={(e) => setFormData({ ...formData, temperatureAtShipment: e.target.value })}
                required
                step="0.1"
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="درجة الحرارة عند الوصول"
                value={formData.temperatureAtArrival}
                onChange={(e) => setFormData({ ...formData, temperatureAtArrival: e.target.value })}
                required
                step="0.1"
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
                <th className="px-6 py-3 text-right">الرقم</th>
                <th className="px-6 py-3 text-right">النوع</th>
                <th className="px-6 py-3 text-right">الشركة</th>
                <th className="px-6 py-3 text-right">التبريد</th>
                <th className="px-6 py-3 text-right">درجة الحرارة</th>
                <th className="px-6 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck) => (
                <tr key={truck._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{truck.truckNumber}</td>
                  <td className="px-6 py-4">{truck.type}</td>
                  <td className="px-6 py-4">{truck.companyName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded ${truck.coolingStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {truck.coolingStatus ? '✓ مناسب' : '✗ غير مناسب'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{truck.temperatureAtShipment}°C → {truck.temperatureAtArrival}°C</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(truck)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(truck._id)}
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
