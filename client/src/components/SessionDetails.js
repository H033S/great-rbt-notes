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

class MaladaptativeBehavior {
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
    /** @type {MaladaptativeBehavior[]} */
    maladaptive_behaviors: [],
    /** @type {string[]} */
    reinforcement: [],
    /** @type {string} */
    session_end_state: "",
  });

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
      {formData.maladaptive_behaviors.map((behavior, index) => (
        <div
          key={index}
          className="behavior-section"
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ color: "#333", marginBottom: "10px" }}>
            Behavior {index + 1}
          </h3>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`behavior-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Behavior:
            </label>
            <input
              type="text"
              id={`behavior-${index}`}
              value={behavior.behavior}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].behavior = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`antecedent-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Antecedent:
            </label>
            <input
              type="text"
              id={`antecedent-${index}`}
              value={behavior.antecedent}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].antecedent = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`function-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Function:
            </label>
            <input
              type="text"
              id={`function-${index}`}
              value={behavior.function}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].function = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`intervention-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Intervention:
            </label>
            <input
              type="text"
              id={`intervention-${index}`}
              value={behavior.intervention}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].intervention = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`replacement_behavior-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Replacement Behavior:
            </label>
            <input
              type="text"
              id={`replacement_behavior-${index}`}
              value={behavior.replacement_behavior}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].replacement_behavior = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`prompts_used-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Prompts Used:
            </label>
            <input
              type="text"
              id={`prompts_used-${index}`}
              value={behavior.prompts_used}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].prompts_used = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`reinforcer-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Reinforcer:
            </label>
            <input
              type="text"
              id={`reinforcer-${index}`}
              value={behavior.reinforcer}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].reinforcer = e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`consequence_based_reinforcement-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Consequence Based Reinforcement:
            </label>
            <input
              type="text"
              id={`consequence_based_reinforcement-${index}`}
              value={behavior.consequence_based_reinforcement}
              onChange={(e) => {
                const newBehaviors = [...formData.maladaptive_behaviors];
                newBehaviors[index].consequence_based_reinforcement =
                  e.target.value;
                setFormData({
                  ...formData,
                  maladaptive_behaviors: newBehaviors,
                });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{ color: "#333", fontWeight: "bold", marginRight: "10px" }}
            >
              Result:
            </span>
            <div style={{ display: "inline", alignItems: "center" }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  marginRight: "50px",
                }}
              >
                <input
                  type="checkbox"
                  checked={behavior.result.increase}
                  onChange={(e) => {
                    const newBehaviors = [...formData.maladaptive_behaviors];
                    newBehaviors[index].result.increase = e.target.checked;
                    setFormData({
                      ...formData,
                      maladaptive_behaviors: newBehaviors,
                    });
                  }}
                  style={{ width: "16px", height: "16px" }}
                />
                Increase
              </label>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  marginLeft: "20px"
                }}
              >
                <input
                  type="checkbox"
                  checked={behavior.result.decrease}
                  onChange={(e) => {
                    const newBehaviors = [...formData.maladaptive_behaviors];
                    newBehaviors[index].result.decrease = e.target.checked;
                    setFormData({
                      ...formData,
                      maladaptive_behaviors: newBehaviors,
                    });
                  }}
                  style={{ width: "16px", height: "16px" }}
                />
                Decrease
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const newBehaviors = formData.maladaptive_behaviors.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, maladaptive_behaviors: newBehaviors });
            }}
            style={{
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
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
            maladaptive_behaviors: [
              ...formData.maladaptive_behaviors,
              new MaladaptativeBehavior(),
            ],
          });
        }}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Behavior
      </button>

      <h2>Reinforcers Used</h2>
      {formData.reinforcement.map((reinforcer, index) => (
        <div
          key={index}
          className="reinforcer-section"
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ color: "#333", marginBottom: "10px" }}>
            Reinforcer {index + 1}
          </h3>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor={`reinforcer-${index}`}
              style={{ color: "#333", display: "block", marginBottom: "5px" }}
            >
              Reinforcer:
            </label>
            <input
              type="text"
              id={`reinforcer-${index}`}
              value={reinforcer}
              onChange={(e) => {
                const newReinforcement = [...formData.reinforcement];
                newReinforcement[index] = e.target.value;
                setFormData({ ...formData, reinforcement: newReinforcement });
              }}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              const newReinforcement = formData.reinforcement.filter(
                (_, i) => i !== index
              );
              setFormData({ ...formData, reinforcement: newReinforcement });
            }}
            style={{
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Remove Reinforcer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            reinforcement: [...formData.reinforcement, ""],
          });
        }}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Reinforcer
      </button>

      <h2>Session End</h2>
      <div>
        <label htmlFor="session_end_state">Session End Notes:</label>
        <input
          type="text"
          id="session_end_state"
          value={formData.session_end_state}
          onChange={(e) =>
            setFormData({ ...formData, session_end_state: e.target.value })
          }
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
