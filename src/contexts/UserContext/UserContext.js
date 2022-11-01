import React, { createContext } from 'react';


export const AuthContext = createContext();
    const authinfo = {};
const UserContext = ({children}) => {
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;