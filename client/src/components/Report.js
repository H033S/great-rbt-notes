"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { html2pdf } from "html2pdf.js";
import "../components/styles/report.css";

const Report = () => {
  const router = useRouter();
  const reportRef = useRef();
  const [patientDetails, setPatientDetails] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);

  // Load saved data when the component mounts
  useEffect(() => {
    const savedPatient = sessionStorage.getItem("patientDetails");
    const savedSession = sessionStorage.getItem("sessionDetails");

    if (savedPatient) {
      setPatientDetails(JSON.parse(savedPatient));
    }
    if (savedSession) {
      setSessionDetails(JSON.parse(savedSession));
    }
  }, []);

  const handleBack = () => {
    // Navigate back to the Summary page
    router.push("/summary");
  };

  const downloadReport = () => 
    {

        html2pdf().from(reportRef.current).save("report.pdf");

    }

  const pdfGenerator = () => {
    const reportData = {
      // Patient details from PatientDetails.js
      client_name: patientDetails?.patientName || "",
      caregiver_name: patientDetails?.caregiverName || "",
      date_of_treatment: patientDetails?.dateOfTreatment || "",
      address: patientDetails?.address || "",
      city: patientDetails?.city || "",
      state: patientDetails?.state || "",
      zip: patientDetails?.zip || "",
      apt: patientDetails?.apt || "",
      // Session details from SessionDetails.js
      session: {
        first_occurrence: {
          antecedent: sessionDetails?.antecedent1 || "",
          maladaptive_behavior: sessionDetails?.maladaptiveBehavior1 || "",
          intervention: sessionDetails?.intervention1 || "",
          result: sessionDetails?.interventionResult1 || ""
        },
        second_occurrence: {
          antecedent: sessionDetails?.antecedent2 || "",
          maladaptive_behavior: sessionDetails?.maladaptiveBehavior2 || "",
          intervention: sessionDetails?.intervention2 || "",
          result: sessionDetails?.interventionResult2 || ""
        },
        reinforcement: {
          reinforcers_used: sessionDetails?.reinforcersUsed || "",
          when_reinforcer_used: sessionDetails?.whenReinforcerUsed || ""
        },
        closure: {
          data_collected: sessionDetails?.dataCollected || "",
          concerns: sessionDetails?.concerns || "",
          next_steps: sessionDetails?.nextSteps || ""
        }
      }
    };
  
    console.log("Generated Report JSON:", JSON.stringify(reportData, null, 2));
  };

  return (
    <div className="report-container" onSubmit={pdfGenerator}>
      <h1>Report</h1>
      <section className="patient-summary" style={{ textAlign: 'center' }}>
        {
          <div className="pdf-container" style={{
            width: '100%',
            height: '600px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            margin: '20px 0'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '10px', color: '#666' }}>PDF Report will be displayed here</p>
              <p style={{ fontSize: '0.9em', color: '#999' }}>Click "Download Report" to generate</p>
            </div>
          </div>
        }
      </section>
      <div className="report-buttons">
        <button type="button" onClick={handleBack}>
          Back to Summary
        </button>
        <button type="button" onClick={downloadReport}>
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Report;