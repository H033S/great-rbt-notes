"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/SessionDetails.css";

const SessionDetails = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    antecedent1: "",
    maladaptiveBehavior1: "",
    intervention1: "",
    interventionResult1: "",
    antecedent2: "",
    maladaptiveBehavior2: "",
    intervention2: "",
    interventionResult2: "",
    reinforcersUsed: "",
    whenReinforcerUsed: "",
    dataCollected: "",
    concerns: "",
    nextSteps: ""
  });

  // Load any saved session details from sessionStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem("sessionDetails");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      sessionStorage.setItem("sessionDetails", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add any additional submission logic here
    navigate.push("/summary");
  };

  const handleBack = () => {
    navigate.push("/patient-details");
  };

  return (
    <form className="session-details-form" onSubmit={handleSubmit}>
      <h2>First Occurrence</h2>
      <div>
        <label htmlFor="antecedent1">Antecedent:</label>
        <input
          type="text"
          id="antecedent1"
          name="antecedent1"
          value={formData.antecedent1}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="maladaptiveBehavior1">Maladaptive Behavior:</label>
        <input
          type="text"
          id="maladaptiveBehavior1"
          name="maladaptiveBehavior1"
          value={formData.maladaptiveBehavior1}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="intervention1">Intervention/Technique Used:</label>
        <input
          type="text"
          id="intervention1"
          name="intervention1"
          value={formData.intervention1}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="interventionResult1">Result of Intervention:</label>
        <input
          type="text"
          id="interventionResult1"
          name="interventionResult1"
          value={formData.interventionResult1}
          onChange={handleChange}
          required
        />
      </div>
      <h2>Second Occurrence</h2>
      <div>
        <label htmlFor="antecedent2">Antecedent:</label>
        <input
          type="text"
          id="antecedent2"
          name="antecedent2"
          value={formData.antecedent2}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="maladaptiveBehavior2">Maladaptive Behavior:</label>
        <input
          type="text"
          id="maladaptiveBehavior2"
          name="maladaptiveBehavior2"
          value={formData.maladaptiveBehavior2}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="intervention2">Intervention/Technique Used:</label>
        <input
          type="text"
          id="intervention2"
          name="intervention2"
          value={formData.intervention2}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="interventionResult2">Result of Intervention:</label>
        <input
          type="text"
          id="interventionResult2"
          name="interventionResult2"
          value={formData.interventionResult2}
          onChange={handleChange}
          required
        />
      </div>
      <h2>Reinforcement</h2>
      <div>
        <label htmlFor="reinforcersUsed">Reinforcers Used:</label>
        <input
          type="text"
          id="reinforcersUsed"
          name="reinforcersUsed"
          value={formData.reinforcersUsed}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="whenReinforcerUsed">When Reinforcer Was Used:</label>
        <input
          type="text"
          id="whenReinforcerUsed"
          name="whenReinforcerUsed"
          value={formData.whenReinforcerUsed}
          onChange={handleChange}
          required
        />
      </div>
      <h2>Closure</h2>
      <div>
        <label htmlFor="dataCollected">Was Data Collected:</label>
        <input
          type="text"
          id="dataCollected"
          name="dataCollected"
          value={formData.dataCollected}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="concerns">Medical/Safety Concerns:</label>
        <input
          type="text"
          id="concerns"
          name="concerns"
          value={formData.concerns}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="nextSteps">Next Steps for ABA Therapy:</label>
        <input
          type="text"
          id="nextSteps"
          name="nextSteps"
          value={formData.nextSteps}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Continue</button>
      <button type="button" onClick={handleBack}>
        Back
      </button>
    </form>
  );
};

export default SessionDetails;
