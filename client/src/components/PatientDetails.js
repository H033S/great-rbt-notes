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

  // On component mount, load saved data from sessionStorage (if any)
  useEffect(() => {
    const savedData = sessionStorage.getItem("patientDetails");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Save the updated form data to sessionStorage
      sessionStorage.setItem("patientDetails", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Continue</button>
    </form>
  );
};

export default PatientDetails;
