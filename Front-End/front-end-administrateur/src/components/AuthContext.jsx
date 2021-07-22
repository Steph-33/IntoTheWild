import React from 'react';

const AuthContext = React.createContext({
    isAuthenticated : {},
    setIsAuthenticated : () => {}
});

export default AuthContext;