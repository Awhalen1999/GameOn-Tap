import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear any previous error messages
    setError(null);

    try {
      // Call the signup function from the Auth context
      await signup(username, email, password);
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account');
    }
  };

  // Handle navigation when user is authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center h-full justify-center bg-base-100'>
      <div className='card lg:card-side bg-base-100 shadow-2xl w-full lg:w-10/12 border border-neutral rounded-none'>
        {/* Form Section  */}
        <div className='card-body lg:w-2/3 bg-white'>
          <h2 className='card-title text-2xl text-black'>Account Signup</h2>
          <form className='flex flex-col space-y-4' onSubmit={handleSignup}>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='username'
                className='text-sm font-semibold text-gray-600'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                autoFocus
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-primary text-black'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            </div>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='confirmPassword'
                className='text-sm font-semibold text-gray-600'
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-primary text-black'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='flex items-center'>
              <label className='label cursor-pointer'>
                <span className='label-text text-gray-600'>Show Password</span>
                <input
                  type='checkbox'
                  id='showPassword'
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  className='ml-2 checkbox checkbox-primary checkbox-sm'
                />
              </label>
            </div>
            {/* Display error message */}
            {error && <p className='text-error'>{error}</p>}
            <button type='submit' className='btn btn-primary w-full'>
              Sign up
            </button>
          </form>
        </div>

        {/* Side Section */}
        <div className='card-body bg-primary text-primary-content lg:w-1/3 flex flex-col '>
          <h2 className='text-3xl font-bold mb-6 text-center'>GameOn Tap</h2>
          <p className='text-center'>
            Login or create an account to access all the features of GameOn Tap.
          </p>
          <p className='mt-4'>
            Already have an account?
            <Link to='/login' className='underline font-bold text-black ml-1'>
              Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
