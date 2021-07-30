import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import AuthContext from './components/AuthContext';
import "./App.css";

const App = () => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const value = {isAuthenticated,setIsAuthenticated}
    return (
        <Router>
            <AuthContext.Provider value={value}>
                <Routes/>
            </AuthContext.Provider>
        </Router>
    );
};

export default App;