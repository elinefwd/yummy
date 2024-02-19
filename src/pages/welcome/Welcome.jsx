import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContextProvider/AuthContextProvider';

function Welcome() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <code> after login </code>
            <p>
                Welcome to Yummy Now!
                {user && <span>Welcome {user.username} !</span>}
            </p>
            <a>
                Recently Served:
                name, recipe, and ratings if rated from the last 5 dishes
            </a>
        </>
    );
}

export default Welcome;
