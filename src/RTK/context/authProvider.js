import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children}) => {
    const loginToken = (token,role) => {
        localStorage.setItem('tokenAuth',token);
        localStorage.setItem('role',role);
    } 
    // const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('tokenAuth');
        localStorage.removeItem('role');
        // navigate('/login')
    }
    return (
        <AuthContext.Provider value={{loginToken,logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;