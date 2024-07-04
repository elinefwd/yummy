import {useContext} from 'react';
import {AuthContext} from '../../components/AuthContextProvider/AuthContextProvider';
import './Welcome.css';
import logo from '../../assets/ynl/yummynowlogo.png';

function Welcome() {
    const {authState} = useContext(AuthContext);

    return (
        <>
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
            <footer>
                <code>
                <p>&copy; 2024 Yummy Now. All rights reserved.</p>
                </code>
            </footer>

        </>

    );
}

export default Welcome;
