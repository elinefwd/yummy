import {useContext} from 'react';
import {AuthContext} from '../../components/AuthContextProvider/AuthContextProvider';
import './Welcome.css';
import logo from '../../assets/ynl/yummynowlogo.png';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Welcome() {
    const {authState} = useContext(AuthContext);

    return (
        <>
            <Header title="My Application" />
            <header>
            <code>
                Welcome to Yummy Now
                {authState.user.username && <span> {authState.user.username} !</span>}
            </code>
            </header>

            <main>
                <div className="welcome-container">
            <a>
                You are here to reward yourself with delicious recipes.

                <br></br>
                Enjoy your time here,
                <br></br>
                and don't forget to check out the <a href="/questions"><u>questions page</u></a> :)
            </a>
            <div>
                <img src={logo} alt="Yummy Now Logo" width="300em" height="300em"/>
            </div>
                </div>
            </main>

            <Footer content="© 2024 Yummy Now" useCodeWrapper={true} />

        </>

    );
}

export default Welcome;
