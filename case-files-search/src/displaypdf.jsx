import React, { useState, useEffect } from 'react';

const DisplayPDF = ({ case_id }) => {
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Example pattern to match the case_id with the PDF
      const pdfFilename = `${4}_2022_Heather_Navarro_Domestic Violence.pdf`; 
      console.log(pdfFilename);
      const fullPath = `case-files-search/renamed_case_files/${pdfFilename}`;
    //   const fullPath = "D:/projects/hack_frontend/novathon_frontend/case-files-search/renamed_case_files/4_2020_Elizabeth_Gonzalez_Cybercrime.pdf"
      
      // Set the download link
      setDownloadLink(fullPath);
    } catch (err) {
      setError('Error preparing PDF file for download');
      console.error(err);
    }
  }, [case_id]);

  const handleDownload = () => {
    if (downloadLink) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadLink;
      link.setAttribute('download', `Case_${case_id}_Document.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>Error: {error}</p>
        <p>Could not prepare PDF for Case ID: {case_id}</p>
      </div>
    );
  }

  if (!downloadLink) {
    return <div>Preparing PDF download...</div>;
  }

  return (
    <div className="flex items-center space-x-4 p-4 border rounded">
      <h3 className="text-lg font-medium">
        PDF for Case ID: {case_id}
      </h3>
      <button 
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DisplayPDF;