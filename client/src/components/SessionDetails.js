"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/SessionDetails.css";

class Result {
  constructor() {
    this.increase = false;
    this.decrease = false;
  }
}

class MaladaptiveBehavior {
  constructor() {
    this.behavior = "";
    this.antecedent = "";
    this.function = "";
    this.intervention = "";
    this.replacement_behavior = "";
    this.prompts_used = "";
    this.reinforcer = "";
    this.consequence_based_reinforcement = "";
    this.result = new Result();
  }
}

const SessionDetails = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    /** @type {MaladaptiveBehavior[]} */
    maladaptiveBehaviors: [],
    /** @type {string[]} */
    reinforcement: [],
    /** @type {string} */
    session_end: "",
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
    navigate.push("/summary");
  };

  const handleBack = () => {
    navigate.push("/patient-details");
  };

  return (
    <form className="session-details-form" onSubmit={handleSubmit}>
      <h2>Maladaptive Behaviors</h2>
      {formData.maladaptiveBehaviors.map((behavior, index) => (
        <div key={index} className="behavior-section" style={{ 
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '15px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Behavior {index + 1}</h3>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor={`behavior-${index}`} style={{ color: '#333', display: 'block', marginBottom: '5px' }}>Behavior:</label>
            <input
              type="text"
              id={`behavior-${index}`}
              value={behavior.behavior}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptiveBehaviors];
                newBehaviors[index].behavior = e.target.value;
                setFormData({ ...formData, maladaptiveBehaviors: newBehaviors });
              }}
              required
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor={`antecedent-${index}`} style={{ color: '#333', display: 'block', marginBottom: '5px' }}>Antecedent:</label>
            <input
              type="text"
              id={`antecedent-${index}`}
              value={behavior.antecedent}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptiveBehaviors];
                newBehaviors[index].antecedent = e.target.value;
                setFormData({ ...formData, maladaptiveBehaviors: newBehaviors });
              }}
              required
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor={`function-${index}`} style={{ color: '#333', display: 'block', marginBottom: '5px' }}>Function:</label>
            <input
              type="text"
              id={`function-${index}`}
              value={behavior.function}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptiveBehaviors];
                newBehaviors[index].function = e.target.value;
                setFormData({ ...formData, maladaptiveBehaviors: newBehaviors });
              }}
              required
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              const newBehaviors = formData.maladaptiveBehaviors.filter((_, i) => i !== index);
              setFormData({ ...formData, maladaptiveBehaviors: newBehaviors });
            }}
            style={{
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Remove Behavior
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            maladaptiveBehaviors: [...formData.maladaptiveBehaviors, new MaladaptiveBehavior()]
          });
        }}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Add Behavior
      </button>

      <h2>Reinforcers Used</h2>
      {formData.reinforcement.map((reinforcer, index) => (
        <div key={index} className="reinforcer-section">
          <input
            type="text"
            value={reinforcer}
            onChange={(e) => {
              const newReinforcement = [...formData.reinforcement];
              newReinforcement[index] = e.target.value;
              setFormData({ ...formData, reinforcement: newReinforcement });
            }}
            required
          />
          <button
            type="button"
            onClick={() => {
              const newReinforcement = formData.reinforcement.filter((_, i) => i !== index);
              setFormData({ ...formData, reinforcement: newReinforcement });
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            reinforcement: [...formData.reinforcement, ""]
          });
        }}
      >
        Add Reinforcer
      </button>

      <h2>Session End</h2>
      <div>
        <label htmlFor="session_end">Session End Notes:</label>
        <input
          type="text"
          id="session_end"
          value={formData.session_end}
          onChange={(e) => setFormData({ ...formData, session_end: e.target.value })}
          required
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
