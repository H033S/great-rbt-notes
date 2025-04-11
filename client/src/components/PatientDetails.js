"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/PatientDetails.css";

const PatientDetails = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    client_name: "",
    caregiver_name: "",
    place_of_service: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    sessionStorage.setItem("patient_details", JSON.stringify(formData));
    navigate.push("/session-details");
  };

  return (
    <form className="patient-details-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="client_name">Client Name:</label>
        <input
          type="text"
          id="client_name"
          name="client_name"
          value={formData.client_name}
          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="caregiver_name">Caregiver Name:</label>
        <input
          type="text"
          id="caregiver_name"
          name="caregiver_name"
          value={formData.caregiver_name}
          onChange={(e) => setFormData({ ...formData, caregiver_name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="place_of_service">Place of Service:</label>
        <input
          type="text"
          id="place_of_service"
          name="place_of_service"
          value={formData.place_of_service}
          onChange={(e) => setFormData({ ...formData, place_of_service: e.target.value })}
          required
        />
      </div>
      <button type="submit">Continue</button>
    </form>
  );
};

export default PatientDetails;
