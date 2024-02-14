import { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios'; // Import Axios

function RegistrationForm({ showRegistration, handleCloseRegistration }) {
    const [username, setUsername] = useState(""); // Change state variable to 'username'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: username,  // Update 'fullName' to 'username'
            email: email,
            password: password
        };

        try {
            const response = await axios.post("https://api.datavortex.nl/yummynow/users", formData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "yummynow:xL5T8mawKxLSD7GWHLTF"
                }
            });
            console.log("User registered successfully:", response.data);
            handleCloseRegistration(); // Close the registration form after successful registration
        } catch (error) {
            console.error("An error occurred while registering user:", error);
        }
    };

    if (!showRegistration) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleCloseRegistration}>&times;</span>
                <h2>Register Form</h2>
                <form onSubmit={handleFormSubmit} className="registration-form">
                    <label>
                        Username: {/* Update label for username */}
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

RegistrationForm.propTypes = {
    showRegistration: PropTypes.bool.isRequired,
    handleCloseRegistration: PropTypes.func.isRequired,
};

export default RegistrationForm;
