import { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { AuthContext } from '../contexts/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.authUser();

        if (res?.user_id) {
          setUser(res); // Set the user if authenticated
        } else {
          setUser(null); // No user found, allow non-logged-in state
        }
      } catch (error) {
        setUser(null); // Allow the app to continue without an authenticated user
      } finally {
        setLoading(false); // End loading state
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors before logging in
      const user = await api.loginUser(email, password);

      setUser(user); // Set the user on successful login
    } catch (error) {
      setError('Invalid email or password'); // Show specific error message for login
      setUser(null); // Reset user state if login fails
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors before signup
      const user = await api.signupUser(username, email, password);

      setUser(user); // Set the user on successful signup
    } catch (error) {
      setError('Signup failed. Please try again.'); // Show generic error message for signup
      setUser(null); // Reset user state if signup fails
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.logoutUser();
      setUser(null); // Reset user on logout
    } catch (error) {
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
