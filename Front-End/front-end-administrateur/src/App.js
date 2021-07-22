import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './styles/components/Routes';
import AuthContext from './components/AuthContext';

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