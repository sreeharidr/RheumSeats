import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Database } from 'lucide-react';
import InstituteList from './components/InstituteList';
import InstituteFormModal from './components/InstituteFormModal';
import { INITIAL_INSTITUTES } from './constants';
import { Institute, InstituteFormData } from './types';

const App: React.FC = () => {
  // State for storing institutes
  const [institutes, setInstitutes] = useState<Institute[]>(() => {
    // Try to load from local storage first to persist changes during session
    const saved = localStorage.getItem('rheumatology_institutes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return INITIAL_INSTITUTES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute | null>(null);

  // Persist to local storage whenever list changes
  useEffect(() => {
    localStorage.setItem('rheumatology_institutes', JSON.stringify(institutes));
  }, [institutes]);

  // Handle Create/Update
  const handleSaveInstitute = (data: InstituteFormData) => {
    if (editingInstitute) {
      // Update existing
      setInstitutes(prev => prev.map(inst => 
        inst.id === editingInstitute.id ? { ...data, id: inst.id } : inst
      ));
    } else {
      // Create new
      const newId = Math.max(...institutes.map(i => i.id), 0) + 1;
      setInstitutes(prev => [...prev, { ...data, id: newId }]);
    }
    setIsModalOpen(false);
    setEditingInstitute(null);
  };

  // Open Modal for Add
  const handleAddClick = () => {
    setEditingInstitute(null);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEditClick = (institute: Institute) => {
    setEditingInstitute(institute);
    setIsModalOpen(true);
  };

  // Filter logic
  const filteredInstitutes = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return institutes.filter(inst => 
      inst.name.toLowerCase().includes(lowerSearch) ||
      inst.city.toLowerCase().includes(lowerSearch) ||
      inst.course.toLowerCase().includes(lowerSearch)
    );
  }, [institutes, searchTerm]);

  // Statistics
  const totalSeats = useMemo(() => {
    return institutes.reduce((acc, curr) => {
      const seats = parseInt(String(curr.seats));
      return isNaN(seats) ? acc : acc + seats;
    }, 0);
  }, [institutes]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">RheumaSeats India</h1>
            <h1 className="text-xl font-bold tracking-tight sm:hidden">RheumaSeats</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Institutes</span>
                <span className="text-sm font-bold text-gray-900">{institutes.length}</span>
             </div>
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Est. Seats</span>
                <span className="text-sm font-bold text-gray-900">{totalSeats}+</span>
             </div>

            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md active:scale-95"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Institute</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Bar */}
        <div className="mb-8 relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all text-base"
            placeholder="Search by institute name, city, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content Header */}
        <div className="mb-4 flex justify-between items-end">
          <h2 className="text-lg font-semibold text-gray-800">
            {searchTerm ? `Search Results (${filteredInstitutes.length})` : 'All Institutes'}
          </h2>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* List Table */}
        <InstituteList 
          institutes={filteredInstitutes} 
          onEdit={handleEditClick} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} RheumaSeats India. Information is for reference purposes only.</p>
        </div>
      </footer>

      {/* Modal */}
      <InstituteFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveInstitute}
        initialData={editingInstitute}
      />
    </div>
  );
};

export default App;