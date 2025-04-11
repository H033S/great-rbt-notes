// Report.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import html2pdf from "html2pdf.js";
import { ArrowLeft, Download } from "lucide-react";
import "../components/styles/Report.css";

const Report = () => {
  const router = useRouter();
  const reportContentRef = useRef();
  const [reportText, setReportText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // On component mount, try to load and parse the report data
  useEffect(() => {
    setLoading(true); // Ensure loading is true initially
    setError(""); // Clear previous errors
    setReportText(""); // Clear previous text

    try {
      const savedReportData = sessionStorage.getItem("reportData");

      if (!savedReportData) {
        setError("Error: No report data found in storage.");
        setLoading(false);
        return;
      }

      // Attempt to parse as JSON first
      try {
        const parsedData = JSON.parse(savedReportData);
        // Check if it's the expected structure {"report": "..."}
        if (parsedData && typeof parsedData.report === 'string') {
          setReportText(parsedData.report); // Extract the actual report string
        } else {
          // It's valid JSON, but not the expected structure, display raw JSON
          console.warn("Report data is valid JSON but not the expected format.");
          setReportText(JSON.stringify(parsedData, null, 2)); // Pretty print JSON
        }
      } catch (jsonError) {
        // If JSON.parse fails, assume it's plain text
        console.log("Report data is not valid JSON, treating as plain text.");
        setReportText(savedReportData); // Use the raw string directly
      }

    } catch (err) {
      console.error("Error processing report data:", err);
      setError("Error reading or processing report data from storage.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to download report as PDF
  const downloadReport = () => {
    if (!reportContentRef.current) {
        console.error("Report content ref not available for PDF generation.");
        return;
    }
    // Configuration options for html2pdf
    const options = {
        margin:       1,
        filename:     'report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, // Use scale for better resolution
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Generate the PDF
    html2pdf().from(reportContentRef.current).set(options).save();
  };

  // Function to navigate back to the summary page
  const handleBack = () => {
    router.push("/summary");
  };

  return (
    <div className="report-container">
      <h1>Generated Report</h1>

      {loading ? (
        <div className="loading-indicator" style={{ textAlign: "center", marginTop: "50px" }}>
          <p>Loading report...</p>
        </div>
      ) : error ? (
         // Display error prominently if there is one
         <div className="error-message" style={{ border: '1px solid red', padding: '15px', color: 'red', backgroundColor: '#ffeeee', margin: '20px 0' }}>
            <p><strong>Error Loading Report:</strong></p>
            <pre>{error}</pre>
         </div>
      ) : (
        // Container for the report content that will be captured for PDF
        <div
          ref={reportContentRef}
          className="report-content-area"
          style={{
            width: "100%",
            maxWidth: "800px", 
            margin: "20px auto",
            padding: "25px",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            fontFamily: "sans-serif", 
            lineHeight: "1.6", 
            color: "#333",
          }}
        >
          {/* Use <pre> to respect newlines (\n) from the backend string */}
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: 0, fontSize: "1rem" }}>
            {reportText}
          </pre>
        </div>
      )}

      {/* Render buttons only if not loading and no error */}
      {!loading && !error && (
          <div className="report-buttons">
            <button type="button" onClick={handleBack}>
              <ArrowLeft size={16} /> Back to Summary
            </button>
            <button type="button" onClick={downloadReport}>
              <Download size={16} /> Download Report
            </button>
          </div>
      )}
      {/* Render Back button even if there's an error */}
       {error && (
           <div className="report-buttons">
             <button type="button" onClick={handleBack}>
               <ArrowLeft size={16} /> Back to Summary
             </button>
           </div>
       )}
    </div>
  );
};

export default Report;