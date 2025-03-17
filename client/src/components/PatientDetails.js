"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../components/styles/PatientDetails.css";

const PatientDetails = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement continue logic here
        console.log("Form Submitted:", formData);
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