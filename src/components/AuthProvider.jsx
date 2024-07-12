import { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { AuthContext } from '../contexts/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const checkAuth = async () => {
    //   try {
    //     const response = await api.authUser();

    //     console.log(response);
    //     if (response.status === 200) {
    //       console.log('Auth:', response.data);
    //       setUser(response.data);
    //     }
    //   } catch (error) {
    //     console.error('Not authenticated', error);
    //   }
    // };

    // checkAuth();

    api
      .authUser()
      .then((res) => {
        if (res.status === 200) {
          console.log('Auth:', response.data);
          setUser(response.data);
        }
      })
      .catch((error) => console.error('Not authenticated', error));
  }, []);

  const login = (email, password) => {
    api
      .loginUser(email, password)
      .then((user) => {
        console.log('Login:', user);
        setUser(user);
      })
      .catch((error) => console.error(JSON.stringify(error)));
  };

  const signup = (username, email, password) => {
    api
      .signupUser(username, email, password)
      .then((user) => {
        console.log('Signup:', user);
        setUser(user);
      })
      .catch((error) => console.error(JSON.stringify(error)));
  };

  const logout = () => {
    api
      .logoutUser()
      .then(() => {
        setUser(null);
        console.log('Logout');
      })
      .catch((error) => console.error(JSON.stringify(error)));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
