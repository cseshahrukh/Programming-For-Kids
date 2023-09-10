import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useUserContext } from '../UserContext';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            console.log('Login successful');
            const userData = await response.json();
            setUser(userData);
            navigate(`/student/${userData.username}/dashboard`);
          } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Login failed';
            setErrorMessage(errorMessage);
          }
        } catch (error) {
          console.error('Error submitting login form:', error);
          setErrorMessage('An error occurred while logging in.');
        }
    };

    const handleTeacherLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('/teacherlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            console.log('Login successful');
            const userData = await response.json();
            setUser(userData);
            navigate(`/teacher/${userData.teacher_id}/courses`);
          } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Login failed';
            setErrorMessage(errorMessage);
          }
        } catch (error) {
          console.error('Error submitting login form:', error);
          setErrorMessage('An error occurred while logging in.');
        }
    };

    return (
        <div className="login-page" style={{ backgroundColor: '#f5f5f5' }}> {/* Grey background */}
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="card shadow">
                            <div className="card-body" style={{ backgroundColor: '#fff' }}> {/* White background */}
                                <h1 className="card-title text-center mb-4">Log In</h1>
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mb-3">Log In</button>
                                    <button
                                        onClick={handleTeacherLogin}
                                        className="btn btn-info w-100"
                                    >
                                        Login as Teacher
                                    </button>
                               </form>
                                <p className="text-center mt-3">
                                    Don't have an account? <Link to="/signup">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {/* Yellow, Red, Blue, and Green bubbles */}
            <div className="bubble yellow-bubble"></div>
            <div className="bubble red-bubble"></div>
            <div className="bubble blue-bubble"></div>
            <div className="bubble green-bubble"></div>

            
            <Footer />
            
        </div>
    );
}

export default Login;
