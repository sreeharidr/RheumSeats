import React from 'react';
import { Edit, MapPin, GraduationCap, Users } from 'lucide-react';
import { Institute } from '../types';

interface InstituteListProps {
  institutes: Institute[];
  onEdit: (institute: Institute) => void;
}

const InstituteList: React.FC<InstituteListProps> = ({ institutes, onEdit }) => {
  if (institutes.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No institutes found</h3>
        <p className="text-gray-500 mt-1">Try adjusting your search or add a new institute.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Mobile View (Cards) */}
      <div className="block md:hidden">
        {institutes.map((institute) => (
          <div key={institute.id} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">{institute.name}</h3>
              <button 
                onClick={() => onEdit(institute)}
                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                aria-label="Edit"
              >
                <Edit size={18} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <span>{institute.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-gray-400 shrink-0" />
                <span>{institute.course}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400 shrink-0" />
                <span className="font-medium text-gray-900">Seats: {institute.seats}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-semibold w-16">#</th>
              <th className="px-6 py-4 font-semibold">Institute Name</th>
              <th className="px-6 py-4 font-semibold">City</th>
              <th className="px-6 py-4 font-semibold">Course</th>
              <th className="px-6 py-4 font-semibold w-24">Seats</th>
              <th className="px-6 py-4 font-semibold text-right w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {institutes.map((institute, index) => (
              <tr key={institute.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900 block">{institute.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{institute.city}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {institute.course}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">{institute.seats}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(institute)}
                    className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Edit details"
                  >
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstituteList;