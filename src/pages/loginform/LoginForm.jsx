import {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {AuthContext} from '../../components/AuthContextProvider/AuthContextProvider.jsx';
import Button from "../../components/Button/Button.jsx";

const LoginForm = ({showLogin, handleCloseLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); // State for the login error message

    const {login, authState, logout} = useContext(AuthContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Clear any existing error messages

        try {
            const response = await axios.post('https://api.datavortex.nl/yummynow/users/authenticate', {
                username: username,
                password: password,
            });

            const jwt = response.data.jwt;
            login(jwt);
        } catch (error) {
            let errorMessage = 'Login failed, please try again.';
            if (error.response && typeof error.response.data === 'string') {
                switch (error.response.data) {
                    case 'User not found':
                        errorMessage = 'Username incorrect, please try again.';
                        break;
                    case 'Invalid password':
                        errorMessage = 'Password incorrect, please try again.';
                        break;
                    default:
                        errorMessage = 'Login failed, please try again.';
                }
            }
            setLoginError(errorMessage);
        }
    };


    useEffect(() => {
        if (authState.user) {
            handleCloseLogin();
        }
    }, [authState]);


    if (!showLogin) {
        return null;
    }

    return (
        <section className="modal">
            <article className="modal-content">
                <button type="submit" className="close" onClick={handleCloseLogin}>Close</button>
                <h2>Login Form</h2>
                <form onSubmit={handleFormSubmit} className="login-form">
                    <fieldset>
                        <legend>Login Information</legend>
                        <label htmlFor="usernameInput">Username:
                            <input
                                id="usernameInput"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label htmlFor="passwordInput">Password:
                            <input
                                id="passwordInput"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </fieldset>

                    {loginError && <p className="login-error">{loginError}</p>}

                    <Button type="submit" text="Login" onClick={handleFormSubmit}/>
                </form>
            </article>
        </section>
    );

};

export default LoginForm;
