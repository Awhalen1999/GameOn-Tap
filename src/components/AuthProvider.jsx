import { useState, useEffect } from 'react';
import * as api from '../utils/api'; // Import API functions
import { AuthContext } from '../contexts/auth'; // Import context for providing auth state

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold authenticated user data
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Effect to check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log('AuthProvider useEffect triggered');
      try {
        const res = await api.authUser(); // Call the backend to check if user is authenticated
        console.log('Auth response:', res);
        if (res?.user_id) {
          // If user is authenticated, set the user state
          setUser(res);
        } else {
          setUser(null); // If not authenticated, set user to null
        }
      } catch (error) {
        console.error('Not authenticated', error);
        setUser(null); // Handle unauthenticated state
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };

    checkAuth(); // Trigger the authentication check
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    console.log('Login function called');
    try {
      setLoading(true);
      const user = await api.loginUser(email, password); // Call to backend for logging in
      console.log('Login successful:', user);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user signup
  const signup = async (username, email, password) => {
    console.log('Signup function called');
    try {
      setLoading(true);
      const user = await api.signupUser(username, email, password); // Call to backend for signing up
      console.log('Signup successful:', user);
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    console.log('Logout function called');
    try {
      setLoading(true);
      await api.logoutUser(); // Call to backend for logging out
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
      {loading ? ( // Show loading state while checking authentication
        <div>Loading...</div>
      ) : (
        children // Render children once loading is complete
      )}
    </AuthContext.Provider>
  );
};
