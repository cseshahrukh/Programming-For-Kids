import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from '../UserContext';
import { useAuth } from '../useAuth';
import Footer from "./Footer";
import NavbarStudent from "./NavbarStudent";

function Discussion() {
    const { course_id } = useParams();
    const [discussions, setDiscussions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [newReplies, setNewReplies] = useState(Array.from({ length: discussions.length }, () => ""));

    const navigate = useNavigate();
    const { user } = useUserContext();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/login`);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetch(`/courses/${course_id}/discussion`)
            .then(response => response.json())
            .then(data => setDiscussions(data.discussions))
            .catch(error => console.error('Error fetching discussions:', error));
    }, [course_id]);

    if (!user) {
        return null;
    }

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();

        if (newQuestion.trim() !== "") {
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

    const handleSubmitReply = async (e, questionIndex) => {
        e.preventDefault();

        if (newReplies[questionIndex].trim() !== "") {
            // print questionIndex
            console.log("questionIndex: " + questionIndex);
            const response = await fetch(`/courses/${course_id}/discussion/${questionIndex}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reply: newReplies[questionIndex]
                })
            });

            if (response.status === 200) {
                const updatedDiscussions = [...discussions];
                updatedDiscussions[questionIndex].replies.push({ reply: newReplies[questionIndex], reply_user_name: "User" });
                setDiscussions(updatedDiscussions);

                // Clear the reply field for this question
                const newRepliesCopy = [...newReplies];
                newRepliesCopy[questionIndex] = "";
                setNewReplies(newRepliesCopy);
            }
        }
    };

    return (
        <div className="discussion-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: "24px" }}>
            <header className="App-header" style={{ fontSize: '18px' }}>
                <NavbarStudent />
            </header>
            <div style={{ flex: 1 }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Discussion for Course: {course_id}</h1>
                <div>
                    <h3>Ask a Question</h3>
                    <form onSubmit={handleSubmitQuestion}>
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            rows="4"
                            style={{ width: "100%", padding: "10px", fontSize: "16px", backgroundColor: "#FFF", border: "2px solid #333", borderRadius: "5px" }}
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
                            {discussions.map((discussion, questionIndex) => (
                                <li key={questionIndex} style={{ backgroundColor: "#FFF", marginBottom: "20px", padding: "10px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}>
                                    <h4>Question {questionIndex + 1}:</h4>
                                    <p>{discussion.question}</p>
                                    <ul>
                                        {discussion.replies && discussion.replies.length > 0 ? (
                                            <div>
                                                <h5>Replies:</h5>
                                                <ul>
                                                    {discussion.replies.map((reply, replyIndex) => (
                                                        <li key={replyIndex}>
                                                            <p>{reply.reply_user_name}: {reply.reply}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p>No replies yet.</p>
                                        )}
                                    </ul>

                                    {/* Reply Form */}
                                    <form onSubmit={(e) => handleSubmitReply(e, questionIndex)}>
                                        <textarea
                                            value={newReplies[questionIndex]}
                                            onChange={(e) => {
                                                const newRepliesCopy = [...newReplies];
                                                newRepliesCopy[questionIndex] = e.target.value;
                                                setNewReplies(newRepliesCopy);
                                            }}
                                            placeholder="Type your reply here..."
                                            rows="4"
                                            style={{ width: "100%", padding: "10px", fontSize: "16px", backgroundColor: "#FFF", border: "2px solid #333", borderRadius: "5px" }}
                                        ></textarea>
                                        <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
                                            Reply
                                        </button>
                                    </form>
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
