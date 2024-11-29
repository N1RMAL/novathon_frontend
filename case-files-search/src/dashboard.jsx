import React, { useState } from 'react';
import CaseFilesSearch from './CaseFilesSearch';
import LegalChatPage from './chat';


const LegalAdvisoryDashboard = () => {
  const [activeContent, setActiveContent] = useState('search');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Crime Data Mining
          </h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li 
              className={`rounded-lg ${activeContent === 'search' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <button 
                onClick={() => setActiveContent('search')} 
                className="w-full text-left block p-3 flex items-center justify-between"
              >
                Search Cases 

              </button>
            </li>
            <li 
              className={`rounded-lg ${activeContent === 'legal' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <button 
                onClick={() => setActiveContent('legal')} 
                className="w-full text-left block p-3 flex items-center justify-between"
              >
                Legallytic AI
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeContent === 'search' && <CaseFilesSearch />}
        {activeContent === 'legal' && <LegalChatPage />}
      </div>
    </div>
  );
};

export default LegalAdvisoryDashboard;