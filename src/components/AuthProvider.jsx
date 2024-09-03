import { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { AuthContext } from '../contexts/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider useEffect triggered');
      try {
        const res = await api.authUser();
        console.log('Auth:', res);
        if (res?.user_id) {
          setUser(res);
        }
      } catch (error) {
        console.error('Not authenticated', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    console.log('Login function called');
    try {
      setLoading(true);
      const user = await api.loginUser(email, password);
      console.log('Login successful:', user);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    console.log('Signup function called');
    try {
      setLoading(true);
      const user = await api.signupUser(username, email, password);
      console.log('Signup successful:', user);
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('Logout function called');
    try {
      setLoading(true);
      await api.logoutUser();
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
