import React, { useState } from "react";
import "./AddCourses.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Form = () => {
    const [courseName, setCourseName] = useState("");
    const [courseLevel, setCourseLevel] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [courseExists, setCourseExists] = useState(false);

    const handleCourseNameChange = (event) => {
        setCourseName(event.target.value);
        setMessage("");
        setCourseExists(false);
    };

    const handleCourseLevelChange = (event) => {
        setCourseLevel(event.target.value);
    };

    const handleShortDescriptionChange = (event) => {
        setShortDescription(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/check-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseName }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                console.log(data)
                if (!courseExists) {
                    setMessage("Continue");
                    setCourseLevel("");
                    setShortDescription("");
                    setDescription("");
                } else {
                    setCourseExists(true);
                    setMessage("Course already exists.");
                }
            } else {
                console.log("Error checking course:", response.statusText);
            }
        } catch (error) {
            console.log("Error checking course:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
            </header>
            <div className="body-container">
                <h1 style={{ color: "#000000" }}>Add Course Materials</h1>
                <h2>Check Course Availability</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="courseName">Course Name:</label>
                        <input
                            type="text"
                            id="courseName"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            required
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                        Check Availability
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
                {!courseExists && message === "Course does not exist." && (
                    <>
                        <h2>Add Course Details</h2>
                        <div className="form-group">
                            <label htmlFor="courseLevel">Course Level:</label>
                            <input
                                type="text"
                                id="courseLevel"
                                value={courseLevel}
                                onChange={handleCourseLevelChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="shortDescription">Short Description:</label>
                            <textarea
                                id="shortDescription"
                                value={shortDescription}
                                onChange={handleShortDescriptionChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />
                        </div>
                    </>
                )}
                <Footer />
            </div>
        </div>
    );

};

export default Form;
