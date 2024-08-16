import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('authToken');

    // Redirect based on token presence
    if (token) {
      navigate('/MainDashboard'); // Redirect to MainDashboard if token exists
    } else {
      navigate('/signin'); // Redirect to sign-in page if no token
    }
  }, [navigate]);

  // Optionally, you can display a loading indicator while redirecting
  return <div>Loading...</div>;
};

export default Redirector;
