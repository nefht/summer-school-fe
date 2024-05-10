import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const data = JSON.parse(localStorage.getItem('authData'));
    return data || null;
  });

  useEffect(() => {
    authData && localStorage.setItem('authData', JSON.stringify(authData));
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
