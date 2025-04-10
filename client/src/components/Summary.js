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
    router.push("/session-details");
  };

  const handleGenerateReport = async () => {
    // Clear previous errors and set loading state
    setError(null);
    setLoading(true);

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


    try {
      const response = await fetch("http://127.0.0.1:8001/api/test/report/", { // Using port 8001
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData)
      });

      if (!response.ok) {
          // Try to get error details from response if possible
          let errorDetails = `HTTP error! Status: ${response.status}`;
          try {
              const errorData = await response.json(); // Assume error response is JSON
              errorDetails = errorData.detail || JSON.stringify(errorData);
          } catch (jsonError) {
              // If response is not JSON or empty, use the status text
              errorDetails = response.statusText || errorDetails;
          }
        throw new Error(`Error generating report: ${errorDetails}`);
      }

      const reportResponse = await response.text();

      sessionStorage.setItem("reportData", reportResponse);
      sessionStorage.setItem("patientDetails", JSON.stringify(patientDetails));
      sessionStorage.setItem("sessionDetails", JSON.stringify(sessionDetails));

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
              <strong>Patient Name:</strong> {patientDetails.patientName}
            </li>
            <li>
              <strong>Caregiver Name:</strong> {patientDetails.caregiverName}
            </li>
            <li>
              <strong>Date of Treatment:</strong> {patientDetails.dateOfTreatment}
            </li>
            <li>
              <strong>Address:</strong> {patientDetails.address}
            </li>
            <li>
              <strong>City:</strong> {patientDetails.city}
            </li>
            <li>
              <strong>State:</strong> {patientDetails.state}
            </li>
            <li>
              <strong>Zip:</strong> {patientDetails.zip}
            </li>
            <li>
              <strong>Apt:</strong> {patientDetails.apt}
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
             <h3>First Occurrence</h3>
            <ul>
              <li>
                <strong>Antecedent:</strong> {sessionDetails.antecedent1}
              </li>
              <li>
                <strong>Maladaptive Behavior:</strong> {sessionDetails.maladaptiveBehavior1}
              </li>
              <li>
                <strong>Intervention:</strong> {sessionDetails.intervention1}
              </li>
              <li>
                <strong>Result:</strong> {sessionDetails.interventionResult1}
              </li>
            </ul>
            <h3>Second Occurrence</h3>
            <ul>
              <li>
                <strong>Antecedent:</strong> {sessionDetails.antecedent2}
              </li>
              <li>
                <strong>Maladaptive Behavior:</strong> {sessionDetails.maladaptiveBehavior2}
              </li>
              <li>
                <strong>Intervention:</strong> {sessionDetails.intervention2}
              </li>
              <li>
                <strong>Result:</strong> {sessionDetails.interventionResult2}
              </li>
            </ul>
            <h3>Reinforcement</h3>
            <ul>
              <li>
                <strong>Reinforcers Used:</strong> {sessionDetails.reinforcersUsed}
              </li>
              <li>
                <strong>When Used:</strong> {sessionDetails.whenReinforcerUsed}
              </li>
            </ul>
            <h3>Closure</h3>
            <ul>
              <li>
                <strong>Data Collected:</strong> {sessionDetails.dataCollected}
              </li>
              <li>
                <strong>Medical/Safety Concerns:</strong> {sessionDetails.concerns}
              </li>
              <li>
                <strong>Next Steps:</strong> {sessionDetails.nextSteps}
              </li>
            </ul>
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