import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContextProvider/AuthContextProvider';

function Welcome() {
    const {authState} = useContext(AuthContext);

    return (
        <>
            <code> after login </code>
            <p>
                Welcome to Yummy Now
                {authState.user.username && <span> {authState.user.username} !</span>}
            </p>
            <a>
              You are here to reward yourself with delicious recipes.
                <br></br>
                Enjoy your time here!
                <br></br>
                And don't forget to check out the <a href="/questions">questions page</a>!
            </a>
        </>
    );
}

export default Welcome;
