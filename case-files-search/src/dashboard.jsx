import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import CaseFilesSearch from './CaseFilesSearch';
import LegalChatPage from './chat';

const LegalAdvisoryDashboard = () => {
  const [activeContent, setActiveContent] = useState('search');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (content) => {
    setActiveContent(content);
    // Close sidebar on mobile after selecting an item
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden absolute top-4 left-4 z-50 text-gray-700"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static top-0 left-0 h-full w-64 bg-white border-r shadow-md 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 z-40
      `}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Crime Data Mining
          </h2>
          {/* Close button for mobile */}
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li 
              className={`rounded-lg ${activeContent === 'search' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <button 
                onClick={() => handleMenuItemClick('search')} 
                className="w-full text-left block p-3 flex items-center justify-between"
              >
                Search Cases
              </button>
            </li>
            <li 
              className={`rounded-lg ${activeContent === 'legal' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <button 
                onClick={() => handleMenuItemClick('legal')} 
                className="w-full text-left block p-3 flex items-center justify-between"
              >
                Legallytic AI
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto md:ml-0 ml-0 mt-16 md:mt-0">
        {activeContent === 'search' && <CaseFilesSearch />}
        {activeContent === 'legal' && <LegalChatPage />}
      </div>
    </div>
  );
};

export default LegalAdvisoryDashboard;