import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Institute, InstituteFormData } from '../types';

interface InstituteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InstituteFormData) => void;
  initialData?: Institute | null;
}

const InstituteFormModal: React.FC<InstituteFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData 
}) => {
  const [formData, setFormData] = useState<InstituteFormData>({
    name: '',
    city: '',
    course: '',
    seats: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        city: initialData.city,
        course: initialData.course,
        seats: initialData.seats
      });
    } else {
      setFormData({
        name: '',
        city: '',
        course: '',
        seats: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Institute' : 'Add New Institute'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. AIIMS"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. New Delhi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
            <input
              required
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. DM Clinical Immunology"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
            <input
              required
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              {initialData ? 'Update Details' : 'Add Institute'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstituteFormModal;