import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import  AuthProvider  from './components/AuthContextProvider/AuthContextProvider.jsx'; // Import the AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider> {/* Wrap the App with the AuthProvider */}
            <Router>
                <App />
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
