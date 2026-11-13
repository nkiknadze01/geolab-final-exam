import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('user_email') || '');

  const login = (email) => {
    const fakeToken = btoa(email + '-' + Date.now());
    localStorage.setItem('auth_token', fakeToken);
    localStorage.setItem('user_email', email);
    setToken(fakeToken);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setToken(null);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
