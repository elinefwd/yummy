import React from 'react';
import './Navigation.css';
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <div className="nav-container">
                <ul>
                    <li><NavLink to="/" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Home</NavLink></li>
                    <li><NavLink to="/favorites" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Favorites</NavLink></li>
                    <li><NavLink to="/questions" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Questions</NavLink></li>
                    <li><NavLink to="/random" className={({ isActive}) => isActive? 'activate link' : 'default-link'} >Random</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;