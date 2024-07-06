import {useState} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from "../../components/Button/Button.jsx"; // Import Axios

function RegistrationForm({showRegistration, handleCloseRegistration}) {
    const [username, setUsername] = useState(""); // Change state variable to 'username'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);


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
            handleCloseRegistration(); // Close the registration form after successful registration
        } catch (error) {
            setErrorMsg("An error occurred while registering user: " + error.message);
        }
    };

    if (!showRegistration) {
        return null;
    }

    return (
        <section className="modal">
            <article className="modal-content">
                <button className="close" onClick={handleCloseRegistration}>Close</button>
                <h2>Register Form</h2>
                {errorMsg && (
                    <div className="error-message">
                        {errorMsg}
                    </div>
                )}
                <form onSubmit={handleFormSubmit} className="registration-form">
                    <fieldset>
                        <legend>User Information</legend>
                        <label htmlFor="username">Username:
                            <input id="username" type="text" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </label>
                        <label htmlFor="email">Email:
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label htmlFor="password">Password:
                            <input id="password" type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                    </fieldset>
                    <Button type="submit" text="Register" onClick={handleFormSubmit}/>
                </form>
            </article>
        </section>
    );

}

RegistrationForm.propTypes = {
    showRegistration: PropTypes.bool.isRequired,
    handleCloseRegistration: PropTypes.func.isRequired,
};

export default RegistrationForm;
