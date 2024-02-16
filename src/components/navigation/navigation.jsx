import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider.jsx';
import logoyn from '../../assets/ynl/logoyn.png';
import './navigation.css';

function Navigation() {
    const { authState, logout } = useContext(AuthContext);
    const isClickable = authState.user !== null;

    return (
        <nav>
            <div className="nav-container">
                <a>
                    <img src={logoyn} className="logo" alt="logo" />
                </a>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'activate link' : 'default-link'} >Home</NavLink>
                    </li>
                    <li className={isClickable ? "nav-item" : "nav-item disabled"}>
                        {isClickable ?
                            <NavLink to="/welcome" className={({ isActive }) => isActive ? 'activate link' : 'default-link'} >Welcome</NavLink>
                            : <span>Welcome</span>}
                        {!isClickable && <div className="no-go-overlay" />}
                    </li>
                    <li className={isClickable ? "nav-item" : "nav-item disabled"}>
                        {isClickable ?
                            <NavLink to="/favorites" className={({ isActive }) => isActive ? 'activate link' : 'default-link'} >Favorites</NavLink>
                            : <span>Favorites</span>}
                        {!isClickable && <div className="no-go-overlay" />}
                    </li>
                    <li>
                        <NavLink to="/random" className={({ isActive }) => isActive ? 'activate link' : 'default-link'} >Random</NavLink>
                    </li>
                    <li>
                        <NavLink to="/questions" className={({ isActive }) => isActive ? 'activate link' : 'default-link'} >Questions</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
