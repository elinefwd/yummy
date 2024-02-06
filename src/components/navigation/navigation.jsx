
import './navigation.css';
import {NavLink,} from "react-router-dom";
import logoyn from "../../assets/ynl/logoyn.png";

function Navigation() {
    return (
        <nav>
            <div className="nav-container">
                <a>
                    <img src={logoyn} className="logo" alt="logo" />
                </a>
                <ul>
                    <li><NavLink to="/" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Home</NavLink></li>
                    <li><NavLink to="/welcome" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Welcome</NavLink></li>
                    <li><NavLink to="/favorites" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Favorites</NavLink></li>
                    <li><NavLink to="/questions" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Questions</NavLink></li>
                    <li><NavLink to="/random" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Random</NavLink></li>
                    </ul>

            </div>
        </nav>
    );
}

export default Navigation;