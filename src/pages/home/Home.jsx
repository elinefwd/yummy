import { useState } from "react";
import LoginForm from "../loginform/LoginForm";
import RegistrationForm from "../registrationform/RegistrationForm";
import "./Home.css";

function Home() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const handleLoginButtonClick = () => {
        setShowLoginModal(true);
        setShowRegistrationModal(false); // Ensure that the other form is closed
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleRegisterButtonClick = () => {
        setShowRegistrationModal(true);
        setShowLoginModal(false); // Ensure that the other form is closed
    };

    const handleCloseRegistrationModal = () => {
        setShowRegistrationModal(false);
    };

    return (
        <>
            <h1>Yummy Now</h1>
            <div className="card">
                <button onClick={handleLoginButtonClick}>Login</button>
                <p></p>
                <button onClick={handleRegisterButtonClick}>Registrate</button>
            </div>

            <LoginForm showLogin={showLoginModal} handleCloseLogin={handleCloseLoginModal} />
            <RegistrationForm showRegistration={showRegistrationModal} handleCloseRegistration={handleCloseRegistrationModal} />
        </>
    );
}

export default Home;
