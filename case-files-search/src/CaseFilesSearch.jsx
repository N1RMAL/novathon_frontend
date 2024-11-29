import React, { useState } from 'react';
import SummaryDialogue from './CaseSummaryModal';
import DisplayPDF from './displaypdf';

const CaseFilesSearch = () => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    year: '',
    criminal_name: '',
    police_station: '',
    crime_type: '',
    top_k: 5
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [caseId, setCaseId] = useState(null);

  const [summaryDialogue, setSummaryDialogue] = useState({
    isOpen: false,
    caseId: null,
    summary: null
  });

  const caseFille = {
    file_path: 'case-files-search/renamed_case_files/14_2022_Heather_Navarro_Domestic Violence.pdf',
    // other data related to the case
  };


  // Function to handle click and set case_id
  const handleClick = () => {
    const caseId = caseFille.file_path.split('_')[0]; // Extract case_id from the file path (assuming it's the first part of the filename)
    setCaseId(caseId);
  };

  const handleSummarize = async (caseId) => {
    setSummaryDialogue({
      isOpen: true,
      caseId: caseId,
      summary: null
    });

    try {
      const response = await fetch(`http://127.0.0.1:8000/get-file-text/${caseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      console.log(data);
      setSummaryDialogue(prev => ({
        ...prev,
        // summary: data.extracted_text.llm_response
        summary: data.extracted_text.llm_response
      }));
    } catch (err) {
      console.error('Summary fetch error:', err);
      setSummaryDialogue(prev => ({
        ...prev,
        summary: 'Failed to generate summary. Please try again.'
      }));
    }
  };

  const handleCloseSummaryDialogue = () => {
    setSummaryDialogue({
      isOpen: false,
      caseId: null,
      summary: null
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/search_case_files/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...searchParams,
          top_k: parseInt(searchParams.top_k) || 5
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError('Failed to fetch case files. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <header className="mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Search Cases</h1>
          <p className="text-gray-500 mt-2">Search and analyze case files</p>
        </div>
      </header>

      {/* Search Form */}
      <div className="bg-white shadow-md rounded-lg border">
        <form onSubmit={handleSearch} className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                name="query"
                value={searchParams.query}
                onChange={handleInputChange}
                placeholder="Search case details, ID, or keywords"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Advanced Search Toggle */}
          <div className="flex items-center mb-4">
            <button 
              type="button"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="text-blue-600 flex items-center hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              {showAdvancedSearch ? 'Hide Advanced Search' : 'Advanced Search'}
            </button>
          </div>

          {/* Advanced Search Fields */}
          {showAdvancedSearch && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="year"
                value={searchParams.year}
                onChange={handleInputChange}
                placeholder="Year"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="criminal_name"
                value={searchParams.criminal_name}
                onChange={handleInputChange}
                placeholder="Criminal Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="police_station"
                value={searchParams.police_station}
                onChange={handleInputChange}
                placeholder="Police Station"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="crime_type"
                value={searchParams.crime_type}
                onChange={handleInputChange}
                placeholder="Crime Type"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <select
                name="top_k"
                value={searchParams.top_k}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {[5, 10, 15, 20].map(num => (
                  <option key={num} value={num}>Top {num} Results</option>
                ))}
              </select>
            </div>
          )}
        </form>
      </div>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Search Results</h2>
          <div className="space-y-4">
            {results.map(caseFile => (
              <div 
                key={caseFile.case_file_id} 
                className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-600">
                      Case ID: {caseFile.case_file_id}
                    </h3>
                    <span className="text-sm text-gray-500 mt-1 block">
                      Year: {caseFile.year}
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {caseFile.crime_type}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Criminal Name:</strong> {caseFile.criminal_name}
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Police Station:</strong> {caseFile.police_station}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border rounded p-4">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Case Details:</strong> {caseFile.case_details}
                  </p>
                </div>
                <div className="mt-4 flex space-x-4">
                <button
        onClick={handleClick}
        className="group flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md max-w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-3 text-blue-600 group-hover:text-blue-700 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span className="text-blue-600 group-hover:text-blue-800 font-semibold transition-colors">
          View Case File
        </span>
      </button>
      {caseId && <DisplayPDF case_id={4} />}
                  <button 
                    onClick={() => handleSummarize(caseFile.case_file_id)}
                    className="group flex items-center px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md max-w-fit"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 mr-3 text-green-600 group-hover:text-green-700 transition-colors" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span className="text-green-600 group-hover:text-green-800 font-semibold transition-colors">
                      Summarize
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <SummaryDialogue 
        isOpen={summaryDialogue.isOpen}
        onClose={handleCloseSummaryDialogue}
        caseId={summaryDialogue.caseId}
        summary={summaryDialogue.summary}
      />
    </div>
  );
};

export default CaseFilesSearch;