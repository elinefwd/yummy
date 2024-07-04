import {useState} from "react";
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
            <header>
            <h1>Yummy Now</h1>
            </header>

            <main>
            <div className="card">
                <button type="button" onClick={handleLoginButtonClick}>Login</button>
                <p></p>
                <button type="button" onClick={handleRegisterButtonClick}>Registrate</button>
            </div>

            <LoginForm showLogin={showLoginModal} handleCloseLogin={handleCloseLoginModal}/>
            <RegistrationForm showRegistration={showRegistrationModal}
                              handleCloseRegistration={handleCloseRegistrationModal}/>
            </main>

            <footer>
                <code>
                <p>&copy; 2024 Yummy Now. All rights reserved.</p>
                </code>
            </footer>
        </>
    );
}

export default Home;
