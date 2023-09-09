import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import './Home.css'; // Import your custom CSS file for styling

function Home() {
    return (
        <div className="home-container">
            <div>
                <Navbar />
            </div>
            <div className="content-container">
                <div className="left-bar">
                    <h3 className="bar-title">Latest News</h3>
                    <ul className="bar-list">
                        <li>🎉 New Coding Challenges Added!</li>
                        <li>🚀 Join Our Coding Contest!</li>
                        <li>📣 Coding Workshops Near You!</li>
                    </ul>
                </div>
                <div className="content">
                    <h1 className="title">
                        Welcome to Programming For Kids!
                    </h1>
                    <p className="subtitle">
                        Unleash Your Coding Superpowers
                    </p>
                    <div className="section">
                        <h2 className="section-title">Unleash Your Imagination!</h2>
                        <p className="description">
                            🚀 Coding is like a magic wand that lets you create your own games, stories, and animations. Imagine making a dancing robot or a flying unicorn! You can bring your wildest dreams to life with the power of code.
                        </p>
                        <img src="magic_wand.png" alt="Magic Wand" className="section-image" />
                    </div>
                    <div className="section">
                        <h2 className="section-title">Be a Tech Wizard!</h2>
                        <p className="description">
                            🔮 Learning to code isn't just fun – it's your ticket to becoming a tech wizard! You'll learn how to solve problems, think creatively, and make things that amaze your friends and family. Get ready to impress the world with your coding superpowers!
                        </p>
                        <img src="tech_wizard.png" alt="Tech Wizard" className="section-image" />
                    </div>
                    <div className="section">
                        <h2 className="section-title">Join Our Coding Adventure!</h2>
                        <p className="description">
                            🌟 Are you ready for an epic coding journey? Dive into our interactive courses filled with cool projects and awesome challenges. With step-by-step guidance, you'll create games, animations, and more! Start your coding adventure today!
                        </p>
                        <Link to="/signup" className="btn btn-primary">Start Coding Now</Link>
                    </div>
                </div>
                <div className="right-bar">
                    <h3 className="bar-title">Featured Projects</h3>
                    <ul className="bar-list">
                        <li>🕹️ Create Your Own Game</li>
                        <li>🎨 Design a Virtual World</li>
                        <li>🤖 Build a Robotic Friend</li>
                    </ul>
                </div>
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
