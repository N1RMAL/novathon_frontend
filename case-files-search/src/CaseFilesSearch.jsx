import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


import * as pdfjsLib from 'pdfjs-dist/build/pdf'


// Configure PDF.js worker
//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function CaseFilesSearch() {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [viewPdfUrl, setViewPdfUrl] = useState(null);

  // Load CSV file when component mounts
  useEffect(() => {
    const loadCases = async () => {
      const response = await fetch('/case_files_data.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setCases(results.data);
        }
      });
    };

    loadCases();
  }, []);

  // PDF Generation and View Functions
  const generatePDFBlob = (caseFile) => {
    const doc = new jsPDF();

    // Set font styles
    doc.setFont('helvetica');
    doc.setFontSize(12);

    // Add title
    doc.setFontSize(16);
    doc.text('Case File Details', 10, 10);
    doc.setFontSize(12);
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`

    // Define the fields to include in PDF (excluding keywords)
    const fieldsToInclude = [
      'case_file_id', 
      'year', 
      'criminal_name', 
      'police_station', 
      'crime_type', 
      'case_details'
    ];

    // Add case details to PDF
    let yPosition = 30;
    fieldsToInclude.forEach((field) => {
      const formattedField = field
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      doc.text(`${formattedField}: ${caseFile[field]}`, 10, yPosition);
      yPosition += 10;
    });

    // Convert PDF to Blob
    return doc.output('blob');
  };

  const handleViewPDF = (caseFile) => {
    const pdfBlob = generatePDFBlob(caseFile);
    if (pdfBlob) {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setViewPdfUrl(pdfUrl);
    } else {
        console.error("Failed to generate PDF blob.");
    }
  };

  const handleDownloadPDF = (caseFile) => {
    const doc = new jsPDF();

    // Reuse the PDF generation logic
    const fieldsToInclude = [
      'case_file_id', 
      'year', 
      'criminal_name', 
      'police_station', 
      'crime_type', 
      'case_details'
    ];

    let yPosition = 30;
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text('Case File Details', 10, 10);
    doc.setFontSize(12);

    fieldsToInclude.forEach((field) => {
      const formattedField = field
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      doc.text(`${formattedField}: ${caseFile[field]}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save(`Case_${caseFile.case_file_id}_Details.pdf`);
  };

  // Search function
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = cases.filter(caseFile => 
      Object.values(caseFile).some(value => 
        value.toString().toLowerCase().includes(term)
      )
    );

    setFilteredCases(filtered);
  };

  // Close PDF Viewer
  const handleClosePDF = () => {
    if (viewPdfUrl) {
      URL.revokeObjectURL(viewPdfUrl);
      setViewPdfUrl(null);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input 
        type="text"
        placeholder="Search case files..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <div>
        {filteredCases.length > 0 ? (
          filteredCases.map((caseFile, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '10px', 
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>Case ID:</strong> {caseFile.case_file_id}<br/>
                <strong>Year:</strong> {caseFile.year}<br/>
                <strong>Criminal Name:</strong> {caseFile.criminal_name}<br/>
                <strong>Crime Type:</strong> {caseFile.crime_type}
              </div>
              <div>
                <button 
                  onClick={() => handleViewPDF(caseFile)}
                  style={{ 
                    padding: '10px', 
                    backgroundColor: '#2196F3', 
                    color: 'white', 
                    border: 'none',
                    marginRight: '10px'
                  }}
                >
                  View PDF
                </button>
                <button 
                  onClick={() => handleDownloadPDF(caseFile)}
                  style={{ 
                    padding: '10px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none' 
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cases found</p>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewPdfUrl && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '80%',
              height: '80%',
              position: 'relative'
            }}
          >
            <button 
              onClick={handleClosePDF}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '5px'
              }}
            >
              Close
            </button>
            <Document
              file={viewPdfUrl}
              options={{ workerSrc: "/pdf.worker.js" }}
            >
              <Page 
                pageNumber={1} 
                width={window.innerWidth * 0.7}
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseFilesSearch;