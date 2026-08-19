import { createContext, useContext, useMemo, useState } from 'react';
import { loginAdmin } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('adminUser') || 'null'));

  const login = async (credentials) => {
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await loginAdmin(credentials);
        const { token, user: loggedInUser } = response.data.data;
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return;
      } catch (error) {
        lastError = error;
        console.log(`Login attempt ${attempt + 1} failed:`, error.message);
        if (attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    throw lastError;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout, isAuthenticated: Boolean(user) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
