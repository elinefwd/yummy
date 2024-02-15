import {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import axios from 'axios'; // Import Axios here
import { AuthContext } from "../AuthContextProvider/AuthContextProvider.jsx";

function LoginForm({ showLogin, handleCloseLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, logout, authState } = useContext(AuthContext);

    // Here is your Axios login function integrated
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://api.datavortex.nl/yummynow/users/authenticate", {
                username: username,
                password: password
            });

            const userToken = response.data.jwt;
            console.log (response.data.jwt)
            login(userToken);
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };
    useEffect(() => {
      console.log(authState);
    }, [authState]);
    const handleLogout = () => {
        logout();
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
                        Username:
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
                {authState && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    showLogin: PropTypes.bool.isRequired,
    handleCloseLogin: PropTypes.func.isRequired,
};

export default LoginForm;

