'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation (e.g., check if username, email, and password are not empty)

    try {
      const response = await axios.post("http://localhost:5001/signup", {"identifier": username, "email": email, "password": password});

      if (response.data) {
        // Redirect to dashboard on successful signup using Next.js navigation
        localStorage.setItem("identifier", email)
        router.push('/dashboard');
      } else {
        // Handle failed signup (e.g., show error message)
        setErrorMessage('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-text">Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-input-group">
          <label htmlFor="username" className="signup-input-label">Username:</label>
          <input
            type="text"
            id="username"
            className="signup-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="email" className="signup-input-label">Email:</label>
          <input
            type="email"
            id="email"
            className="signup-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-input-group">
          <label htmlFor="password" className="signup-input-label">Password:</label>
          <input
            type="password"
            id="password"
            className="signup-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-submit-button">Signup</button>
      </form>
      {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
    </div>
  );
};

export default Signup;
