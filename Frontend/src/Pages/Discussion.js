import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

function Discussion() {
    const { course_id } = useParams();
    const [discussions, setDiscussions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    // Fetch discussions (questions and replies) from the server
    useEffect(() => {
        fetch(`/courses/${course_id}/discussion`)
            .then(response => response.json())
            .then(data => setDiscussions(data.discussions))
            .catch(error => console.error('Error fetching discussions:', error));
    }, [course_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newQuestion.trim() !== "") {
            // Simulate sending the question to the server and updating the discussions list
            const response = await fetch(`/courses/${course_id}/discussion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: newQuestion
                })
            });

            if (response.status === 200) {
                const updatedDiscussions = [...discussions, { question: newQuestion }];
                setDiscussions(updatedDiscussions);
                setNewQuestion("");
            }
        }
    };

    return (
        <div className="discussion-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div style={{ flex: 1, padding: "20px" }}>
                <h1>Discussion for Course: {course_id}</h1>
                <div>
                    <h3>Ask a Question</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            rows="4"
                            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                        ></textarea>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
                            Submit
                        </button>
                    </form>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <h3>Questions and Replies</h3>
                    {discussions.length === 0 ? (
                        <p>No discussions yet.</p>
                    ) : (
                        <ul>
                        {discussions.map((discussion, index) => (
                            <li key={index}>
                                <h4>Question {index + 1}:</h4>
                                <p>{discussion.question}</p>
                                {discussion.replies.length > 0 ? (
                                    <div>
                                        <h5>Replies:</h5>
                                        <ul>
                                            {discussion.replies.map((reply, replyIndex) => (
                                                <li key={replyIndex}>
                                                    <p>Reply: {reply.reply}</p>
                                                    <p>User: {reply.reply_user_name}</p>
                                                </li>
                                ))}
                        </ul>
                </div>
            ) : (
                <p>No replies yet.</p>
            )}
            <p>User: {discussion.user_name}</p>
        </li>
    ))}
</ul>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Discussion;