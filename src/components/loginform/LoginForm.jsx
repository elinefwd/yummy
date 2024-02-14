import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function LoginForm({ showLogin, handleCloseLogin }) {
    const [username, setUsername] = useState(""); // Update 'email' to 'username'
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: username, // Update 'email' to 'username'
            password: password,
        };

        try {
            const response = await axios.post(
                "https://api.datavortex.nl/yummynow/users/authenticate",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "yummynow:xL5T8mawKxLSD7GWHLTF",
                    },
                }
            );
            console.log("Login successful! Received token:", response.data.token);
            handleCloseLogin(); // Close the login form after successful login
        } catch (error) {
            console.error("An error occurred during login:", error);
            // Handle login error (e.g., display a message to the user)
        }
    };

    if (!showLogin) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
        <span className="close" onClick={handleCloseLogin}>
          &times;
        </span>
                <h2>Login Form</h2>
                <form onSubmit={handleFormSubmit} className="login-form">
                    <label>
                        Username: {/* Change label to reflect 'Username' */}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    showLogin: PropTypes.bool.isRequired,
    handleCloseLogin: PropTypes.func.isRequired,
};

export default LoginForm;
