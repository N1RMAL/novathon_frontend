import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SummaryDialogue = ({ 
  isOpen, 
  onClose, 
  caseId, 
  summary 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="
        relative w-full max-w-2xl 
        bg-white border border-gray-200 
        rounded-lg shadow-xl
        transform transition-all duration-300 
        ease-in-out scale-100 opacity-100
      ">
        {/* Header */}
        <div className="
          flex justify-between items-center 
          p-4 border-b border-gray-200
        ">
          <h2 className="text-xl font-semibold text-gray-900">
            Case Summary (Case ID: {caseId})
          </h2>
          <button 
            onClick={onClose} 
            className="
              text-gray-400 hover:text-gray-600 
              transition-colors duration-200
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[500px] overflow-y-auto">
          {summary ? (
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin mb-4 mx-auto w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                <p className="text-gray-600">Generating summary...</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="
          flex justify-end space-x-2 
          p-4 border-t border-gray-200
        ">
          <button 
            onClick={onClose} 
            className="
              px-4 py-2 
              bg-gray-200 text-gray-800 
              rounded hover:bg-gray-300
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryDialogue;