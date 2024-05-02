import React, { useState } from 'react';
import { IoClose, IoMail } from 'react-icons/io5';
import { FaLock, FaUser } from 'react-icons/fa';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { loginUser, signupUser } from '../utils/api.js';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginUser(email, password);
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signupUser(username, email, password);
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    isModalOpen && (
      <dialog
        id='login_modal'
        className='modal backdrop-blur-sm'
        open={isModalOpen}
      >
        <div className='modal-box px-6 py-10 border border-base-content'>
          <form method='dialog'>
            <button className='absolute top-0 right-0 btn'>
              <IoClose size={24} />
            </button>
          </form>
          <h2 className='text-2xl font-bold text-center mt-4 mb-6'>
            {isLogin ? 'Login' : 'Sign-up'}
          </h2>
          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <label className='input input-bordered flex items-center gap-2 mb-4'>
                <FaUser />
                <input
                  type='text'
                  className='grow'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            )}
            <label className='input input-bordered flex items-center gap-2 mb-4'>
              <IoMail />
              <input
                type='text'
                className='grow'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className='input input-bordered flex items-center gap-2 mb-4'>
              <FaLock />
              <input
                type={passwordVisible ? 'text' : 'password'}
                className='grow'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={togglePasswordVisibility}
                className='focus:outline-none'
              >
                {passwordVisible ? (
                  <IoMdEye size={24} />
                ) : (
                  <IoMdEyeOff size={24} />
                )}
              </button>
            </label>
            <button
              type='submit'
              className='btn btn-primary w-full mb-4 text-lg'
              disabled={loading}
            >
              {isLogin ? 'Login' : 'Sign-up'}
            </button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
          <p className=' text-lg'>
            {isLogin ? `Don't have an account?` : 'Already have an account?'}
            <span
              onClick={switchForm}
              className='text-primary cursor-pointer font-semibold'
            >
              {isLogin ? '  Sign-up' : '  Login'}
            </span>
          </p>
        </div>
      </dialog>
    )
  );
};

export default LoginPage;
