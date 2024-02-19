import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider.jsx';

const LoginForm = ({ showLogin, handleCloseLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login, authState, logout } = useContext(AuthContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://api.datavortex.nl/yummynow/users/authenticate', {
                username: username,
                password: password,
            });

const user = response.data.user;
console.log(user);
            const jwt = response.data.jwt;
            login(jwt);
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
