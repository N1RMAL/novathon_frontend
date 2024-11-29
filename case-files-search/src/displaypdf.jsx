import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import the PDF plugin
import { pdfjs } from 'react-pdf';

const DisplayPDF = ({ case_id }) => {
  const [pdfFile, setPdfFile] = useState(null);

  // Function to match case_id and find corresponding PDF
  useEffect(() => {
    // Example pattern to match the case_id with the PDF
    const pdfFilename = `${case_id}_2022_Heather_Navarro_Domestic Violence.pdf`; 
    setPdfFile(`case-files-search/renamed_case_files/${pdfFilename}`);
  }, [case_id]);

  if (!pdfFile) {
    return <div>Loading PDF...</div>;
  }

  return (
    <div>
      <h3>Viewing PDF for Case ID: {case_id}</h3>
      <Worker workerUrl={`https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
  <Viewer fileUrl={pdfFile} />
</Worker>
    </div>
  );
};

export default DisplayPDF;
