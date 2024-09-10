import { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { AuthContext } from '../contexts/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider useEffect triggered');
      try {
        const res = await api.authUser();
        console.log('Auth:', res);
        if (res?.user_id) {
          setUser(res); // Set the user if authenticated
        } else {
          setUser(null); // No user found, allow non-logged-in state
        }
      } catch (error) {
        console.error('Not authenticated', error);
        setUser(null); // Allow the app to continue without an authenticated user
      } finally {
        setLoading(false); // End loading state
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
      setUser(user); // Set the user on successful login
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
      setUser(null); // Reset user state if login fails
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
      setUser(user); // Set the user on successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
      setUser(null); // Reset user state if signup fails
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log('Logout function called');
    try {
      setLoading(true);
      await api.logoutUser();
      setUser(null); // Reset user on logout
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
