import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider.jsx';

const LoginForm = ({ showLogin, handleCloseLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const { login } = useContext(AuthContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Clear any existing error messages

        try {
            const response = await axios.post('https://api.yourbackend.com/users/authenticate', {
                username: username,
                password: password,
            });

            const jwt = response.data.jwt;
            login(jwt);
        } catch (error) {
            console.error('An error occurred during login:', error);

            let errorMessage = 'Login failed, please try again.';

            if (error.response && typeof error.response.data === 'string') {
                switch (error.response.data) {
                    case 'User not found':
                        errorMessage = 'Username incorrect, please try again.';
                        break;
                    case 'Invalid username/password':
                        errorMessage = 'Password incorrect, please try again.';
                        break;
                    default:
                        errorMessage = 'Login failed, please try again.';
                }
            }
            setLoginError(errorMessage);
        }
    };

    if (!showLogin) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleCloseLogin}>&times;</span>
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
                    {loginError && <p className="login-error">{loginError}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    showLogin: PropTypes.bool.isRequired,
    handleCloseLogin: PropTypes.func.isRequired,
};

export default LoginForm;
