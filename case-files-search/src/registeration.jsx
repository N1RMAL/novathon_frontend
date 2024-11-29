import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    cpoId: '',
    name: '',
    dob: '',
    currentStation: '',
    email: '',
    confirmEmail: '',
    phone: '',
    confirmPhone: '',
    idCard: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, idCard: e.target.files[0] });
  };

  const validateForm = () => {
    const errors = {};

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '' && key !== 'idCard') {
        errors[key] = `${key} is required.`;
      }
    });

    // Check if email and confirm email match
    if (formData.email !== formData.confirmEmail) {
      errors.email = 'Email and confirm email must match.';
    }

    // Check if phone and confirm phone match
    if (formData.phone !== formData.confirmPhone) {
      errors.phone = 'Phone number and confirm phone number must match.';
    }

    // Check if file is uploaded
    if (!formData.idCard) {
      errors.idCard = 'ID card is required.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // If no errors, simulate form submission
      alert('FID number and password will be send to the provided email after verification.');

      // Redirect to HomePage after 5 seconds
      setTimeout(() => {
        navigate('/'); // Replace '/home' with your homepage route
      }, 5000);
    } else {
      setFormErrors(errors); // Display form errors
    }
  };

  const isFormValid = () => {
    return (
      formData.email === formData.confirmEmail &&
      formData.phone === formData.confirmPhone &&
      !Object.values(formData).some((value) => value === '') &&
      formData.idCard // Ensure file is uploaded
    );
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-6">
          Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CPO ID */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cpoId" className="block text-slate-700 font-semibold mb-2">
                CPO ID
              </label>
              <input
                type="text"
                id="cpoId"
                name="cpoId"
                value={formData.cpoId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter CPO ID"
                required
              />
              {formErrors.cpoId && <p className="text-red-500">{formErrors.cpoId}</p>}
            </div>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-slate-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Name"
                required
              />
              {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-slate-700 font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {formErrors.dob && <p className="text-red-500">{formErrors.dob}</p>}
          </div>

          {/* Current Station */}
          <div>
            <label htmlFor="currentStation" className="block text-slate-700 font-semibold mb-2">
              Current Station
            </label>
            <input
              type="text"
              id="currentStation"
              name="currentStation"
              value={formData.currentStation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Current Station"
              required
            />
            {formErrors.currentStation && <p className="text-red-500">{formErrors.currentStation}</p>}
          </div>

          {/* Email and Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Email Address"
                required
              />
              {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="confirmEmail" className="block text-slate-700 font-semibold mb-2">
                Confirm Email Address
              </label>
              <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm Email Address"
                required
              />
              {formErrors.confirmEmail && <p className="text-red-500">{formErrors.confirmEmail}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-slate-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Phone Number"
                required
              />
              {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
            </div>
            <div>
              <label htmlFor="confirmPhone" className="block text-slate-700 font-semibold mb-2">
                Confirm Phone Number
              </label>
              <input
                type="tel"
                id="confirmPhone"
                name="confirmPhone"
                value={formData.confirmPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm Phone Number"
                required
              />
              {formErrors.confirmPhone && <p className="text-red-500">{formErrors.confirmPhone}</p>}
            </div>
          </div>

          {/* ID Card */}
          <div>
            <label htmlFor="idCard" className="block text-slate-700 font-semibold mb-2">
              ID Card (Upload)
            </label>
            <input
              type="file"
              id="idCard"
              name="idCard"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {formErrors.idCard && <p className="text-red-500">{formErrors.idCard}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
