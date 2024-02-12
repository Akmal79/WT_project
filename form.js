import React, { useState } from 'react';
import './form.css';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    email: '',
    campus: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/saveFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form Successfully submitted');
        // Optionally, reset the form fields after submission
        setFormData({ name: '', srn: '', email: '', campus: '' });
      } else {
        throw new Error('Failed to save form data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="srn">SRN:</label>
        <input type="text" id="srn" name="srn" value={formData.srn} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Campus:</label>
        <div>
          <label>
            <input
              type="radio"
              name="campus"
              value="RR Campus"
              checked={formData.campus === 'RR Campus'}
              onChange={handleChange}
            />
            RR Campus
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="campus"
              value="EC Campus"
              checked={formData.campus === 'EC Campus'}
              onChange={handleChange}
            />
            EC Campus
          </label>
        </div>

        <br />
        <input type="submit" value="Submit" />
        <input type="reset" />
      </form>
    </div>
  );
}

export default Form;