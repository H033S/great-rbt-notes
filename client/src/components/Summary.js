"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "../components/styles/Summary.css";

const Summary = () => {
  const router = useRouter();
  const [patientDetails, setPatientDetails] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold potential errors

  // Load saved data when the component mounts
  useEffect(() => {
    const savedPatient = sessionStorage.getItem("patient_details");
    const savedSession = sessionStorage.getItem("session_details");

    if (savedPatient) {
      setPatientDetails(JSON.parse(savedPatient));
    }
    if (savedSession) {
      setSessionDetails(JSON.parse(savedSession));
    }
  }, []);

  const handleBack = () => {
    router.push("/session-details");
  };

  const handleGenerateReport = async () => {
    // Clear previous errors and set loading state
    setError(null);
    setLoading(true);

    const reportData = {
      client_name: patientDetails?.client_name || "",
      caregiver_name: patientDetails?.caregiver_name || "",
      place_of_service: patientDetails?.place_of_service || "",
      maladaptive_behaviors: sessionDetails?.maladaptive_behaviors || [],
      reinforcers_used: sessionDetails?.reinforcers_used || [],
      session_end_state: sessionDetails?.session_end_state || "",
    };

    console.log("Generated Report JSON:", JSON.stringify(reportData, null, 2));

    try {
      console.log("Attempting to send report data:", reportData);
      console.log("Environment", process.env.NODE_ENV);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log("API URL:", apiUrl);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(reportData)
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorDetails = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData.detail || JSON.stringify(errorData);
        } catch (jsonError) {
          errorDetails = response.statusText || errorDetails;
        }
        throw new Error(`Error generating report: ${errorDetails}`);
      }

      const reportResponse = await response.text();
      console.log("Report response received:", reportResponse);

      sessionStorage.setItem("reportData", reportResponse);
      sessionStorage.setItem("patient_details", JSON.stringify(patientDetails));
      sessionStorage.setItem("session_details", JSON.stringify(sessionDetails));

      router.push("/report");

    } catch (error) {
      console.error("Error generating report:", error);
      setError(error.message || "An unexpected error occurred."); // Set error state for display
    } finally {
      setLoading(false); // Ensure loading is turned off
    }
  };

  return (
    <div className="summary-container">

      {/* Loading Overlay - Rendered conditionally */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Generating Report...</p>
          <p>Please wait.</p>
        </div>
      )}

      <h1>Summary</h1>

      {/* Display Error Message */}
      {error && (
        <div className="error-message">
          <p><strong>Error:</strong> {error}</p>
          <p>Please check the details or try again later.</p>
        </div>
      )}

      <section className="patient-summary">
        <h2>Patient Details</h2>
        {patientDetails ? (
          <ul>
            <li>
              <strong>Client Name:</strong> {patientDetails.client_name}
            </li>
            <li>
              <strong>Caregiver Name:</strong> {patientDetails.caregiver_name}
            </li>
            <li>
              <strong>Place of Service:</strong> {patientDetails.place_of_service}
            </li>
          </ul>
        ) : (
          <p>No patient details available.</p>
        )}
      </section>

      <section className="session-summary">
        <h2>Session Details</h2>
        {sessionDetails ? (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Maladaptive Behaviors</h3>
            {sessionDetails.maladaptive_behaviors && sessionDetails.maladaptive_behaviors.map((behavior, index) => (
              <div key={index} className="behavior-summary" style={{ 
                marginBottom: '20px',
                marginLeft: '20px'
              }}>
                <h4 style={{ 
                  marginBottom: '15px',
                  borderBottom: '1px solid #cce0ff',
                  paddingBottom: '8px'
                }}>Behavior {index + 1}</h4>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  marginLeft: '20px'
                }}>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Behavior:</strong>{' '}
                    {behavior.behavior}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Antecedent:</strong>{' '}
                    {behavior.antecedent}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Function:</strong>{' '}
                    {behavior.function}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Intervention:</strong>{' '}
                    {behavior.intervention}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Replacement Behavior:</strong>{' '}
                    {behavior.replacement_behavior}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Prompts Used:</strong>{' '}
                    {behavior.prompts_used}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Reinforcer:</strong>{' '}
                    {behavior.reinforcer}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Consequence Based Reinforcement:</strong>{' '}
                    {behavior.consequence_based_reinforcement}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Result:</strong>{' '}
                    {behavior.result.increase ? 'Increase' : ''} 
                    {behavior.result.increase && behavior.result.decrease ? ', ' : ''}
                    {behavior.result.decrease ? 'Decrease' : ''}
                  </li>
                </ul>
              </div>
            ))}

            <h3>Reinforcers Used</h3>
            {sessionDetails.reinforcement && sessionDetails.reinforcement.length > 0 ? (
              <ul>
                {sessionDetails.reinforcement.map((reinforcer, index) => (
                  <li key={index}>{reinforcer}</li>
                ))}
              </ul>
            ) : (
              <p>No reinforcers recorded.</p>
            )}

            <h3>Session End</h3>
            <p>{sessionDetails.session_end_state || 'No session end notes recorded.'}</p>
          </div>
        ) : (
          <p>No session details available.</p>
        )}
      </section>

      {/* Buttons Section */}
      <div className="summary-buttons">
        {/* Back Button - Disable while loading */}
        <button
          type="button"
          onClick={handleBack}
          disabled={loading} // Disable Back button during loading too
          style={{ marginRight: "10px", display: "inline-flex", alignItems: "center", gap: "5px" }}
        >
          <ArrowLeft size={16} /> Back to Session Details
        </button>

        {/* Generate Report Button - Disable and change text while loading */}
        <button
          type="button"
          onClick={handleGenerateReport}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>
    </div>
  );
};

export default Summary;