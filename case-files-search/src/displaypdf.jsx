import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const DisplayPDF = ({ case_id }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to match case_id and find corresponding PDF
  useEffect(() => {
    try {
      // Example pattern to match the case_id with the PDF
      const pdfFilename = `${case_id}_2022_Heather_Navarro_Domestic Violence.pdf`; 
      const fullPath = `case-files-search/renamed_case_files/${pdfFilename}`;
      
      // Check if file exists (you might need to implement this check)
      setPdfFile(fullPath);
    } catch (err) {
      setError('Error loading PDF file');
      console.error(err);
    }
  }, [case_id]);

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
        <p>Could not load PDF for Case ID: {case_id}</p>
      </div>
    );
  }

  if (!pdfFile) {
    return <div>Loading PDF...</div>;
  }

  return (
    <div>
      <h3>Viewing PDF for Case ID: {case_id}</h3>
      <div style={{ height: '600px' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.338/build/pdf.worker.min.js">
          <Viewer 
            fileUrl={pdfFile}
            renderError={(error) => (
              <div className="text-red-500">
                <p>Failed to load PDF:</p>
                <p>{error.message}</p>
              </div>
            )}
          />
        </Worker>
      </div>
    </div>
  );
};

export default DisplayPDF;