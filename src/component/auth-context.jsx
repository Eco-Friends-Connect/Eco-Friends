import { createContext } from 'react';
// import AuthProvider from './auth-context';

// const useAuth = () => {
//     const context = useContext(AuthProvider);
//     console.log('useAuth context:', context); 
//     if (!context) {
//         console.error("useAuth must be used within an AuthProvider");
//         return {}; 
//     }
//     return context;
// };
const AuthContext = createContext();

export default AuthContext;