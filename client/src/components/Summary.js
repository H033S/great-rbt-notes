"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/Summary.css";

const Summary = () => {
  const router = useRouter();
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
    // Navigate back to the SessionDetails page
    router.push("/session-details");
  };

  const handleGenerateReport = () => {
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
  
    // Later you can send reportData to your backend via fetch, axios, etc.
  };
  

  return (
    <div className="summary-container">
      <h1>Summary</h1>
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
      <div className="summary-buttons">
        <button type="button" onClick={handleBack}>
          Back to Session Details
        </button>
        <button type="button" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default Summary;
