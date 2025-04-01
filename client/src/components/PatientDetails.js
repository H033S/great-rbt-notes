"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/PatientDetails.css";

const PatientDetails = () => {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    patientName: "",
    caregiverName: "",
    dateOfTreatment: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    apt: ""
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
        <label htmlFor="patientName">Patient Name:</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="caregiverName">Caregiver Name:</label>
        <input
          type="text"
          id="caregiverName"
          name="caregiverName"
          value={formData.caregiverName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="dateOfTreatment">Date of Treatment:</label>
        <input
          type="date"
          id="dateOfTreatment"
          name="dateOfTreatment"
          value={formData.dateOfTreatment}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="zip">Zip:</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="apt">Apt. (Optional):</label>
        <input
          type="text"
          id="apt"
          name="apt"
          value={formData.apt}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Continue</button>
    </form>
  );
};

export default PatientDetails;
