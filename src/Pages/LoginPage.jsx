import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, user, error } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  // Redirect user to home page if logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center h-screen lg:h-full p-6 justify-center bg-base-100'>
      <div className='card lg:card-side bg-base-100 shadow-2xl w-full lg:w-10/12 border border-neutral rounded-none '>
        {/* Form Section  */}
        <div className='card-body lg:w-2/3 bg-white '>
          <h2 className='card-title text-2xl text-black'>Account Login</h2>
          <form className='flex flex-col space-y-4' onSubmit={handleLogin}>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-gray-600'
              >
                Email address
              </label>
              <input
                type='email'
                id='email'
                autoFocus
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-primary text-black'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='password'
                className='text-sm font-semibold text-gray-600'
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-primary text-black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='flex items-center mt-2'>
                <label className='label cursor-pointer'>
                  <span className='label-text text-gray-600'>
                    Show Password
                  </span>
                  <input
                    type='checkbox'
                    id='showPassword'
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                    className='ml-2 checkbox checkbox-primary checkbox-sm'
                  />
                </label>
              </div>
            </div>
            {/* Display error message from context */}
            {error && <p className='text-error'>{error}</p>}
            <button type='submit' className='btn btn-primary w-full'>
              Log in
            </button>
          </form>
        </div>

        {/* Side Section  */}
        <div className='card-body bg-primary text-primary-content lg:w-1/3 flex flex-col  '>
          <h2 className='text-3xl font-bold mb-6 text-center'>GameOn Tap</h2>
          <p className='text-center'>
            Login or create an account to access all the features of GameOn Tap.
          </p>
          <p className='mt-4'>
            Don't have an account?
            <Link to='/signup' className='underline font-bold text-black ml-1'>
              Get Started!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
