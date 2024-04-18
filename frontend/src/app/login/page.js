'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
require("dotenv").config();
import axios from 'axios';

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation (e.g., check if username and password are not empty)

    try {
      const response = await axios.post("http://localhost:5001/login", {'email': username, 'password': password});

      if (response.status === 200) {
        // Redirect to dashboard on successful login using Next.js navigation
        localStorage.setItem("identifier", username)
        router.push("/dashboard")
      } else {
        // Handle failed login (e.g., show error message)
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
<div className='login-container'>
  <h1 className='login-text'>Login</h1>
  <form onSubmit={handleSubmit} className='login-form'>
    <div className='login-input-group'>
      <label htmlFor="username" className='login-input-label'>Username:</label>
      <input
        type="text"
        id="username"
        className='login-input-field'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className='login-input-group'>
      <label htmlFor="password" className='login-input-label'>Password:</label>
      <input
        type="password"
        id="password"
        className='login-input-field'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit" className='login-submit-button'>Login</button>
  </form>
</div>

  );
};

export default Login;

// export default function Login() {
//   return(<div>
//     Hallo halo this is uncle roger
//   </div>)
// }