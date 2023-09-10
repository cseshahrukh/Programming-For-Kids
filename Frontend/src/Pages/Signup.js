import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
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
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Signup successful');
                navigate('/login');
            } else {
                const errorData = await response.json(); // Parse error response
                const errorMessage = errorData.message || 'Signup failed';
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error submitting signup form:', error);
            setErrorMessage('An error occurred while signing up.');
        }
    };

    return (
        <div className="signup-page">
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="card-title text-center">Sign Up</h1>
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
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
                                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                                </form>
                                <p className="text-center mt-3">
                                    Already have an account? <Link to="/login">Log in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;
