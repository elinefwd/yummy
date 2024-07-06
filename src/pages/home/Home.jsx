import {useState} from "react";
import LoginForm from "../loginform/LoginForm";
import RegistrationForm from "../registrationform/RegistrationForm";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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
            <Header title="Yummy Now" />

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

                <Footer content="© 2024 Yummy Now" useCodeWrapper={false} />
            </footer>
        </>
    );
}

export default Home;
