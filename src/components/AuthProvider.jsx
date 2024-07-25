import { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { AuthContext } from '../contexts/auth';

// if (res.status === 200) {
//   setUser(res);
// }

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider useEffect triggered');
      try {
        const res = await api.authUser();
        console.log('Auth:', res);
        if (res && res.user_id) {
          setUser(res);
        }
      } catch (error) {
        console.error('Not authenticated', error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    console.log('Login function called');
    try {
      const user = await api.loginUser(email, password);
      console.log('Login successful:', user);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
    }
  };

  const signup = async (username, email, password) => {
    console.log('Signup function called');
    try {
      const user = await api.signupUser(username, email, password);
      console.log('Signup successful:', user);
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      setUser(null);
    }
  };

  const logout = async () => {
    console.log('Logout function called');
    try {
      await api.logoutUser();
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
