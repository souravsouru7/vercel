import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-100">
      <main className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg mt-20">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Log In</h1>
          <p className="text-gray-400">Access your account to manage your bookings.</p>
        </section>

        <section>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-4">
                <label htmlFor="email" className="block mb-2">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 mb-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${formErrors.email ? 'border-red-500' : ''}`}
                />
                {formErrors.email && <p className="text-red-500 mb-4">{formErrors.email}</p>}

                <label htmlFor="password" className="block mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 mb-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${formErrors.password ? 'border-red-500' : ''}`}
                />
                {formErrors.password && <p className="text-red-500 mb-4">{formErrors.password}</p>}
              </fieldset>

              <button
                type="submit"
                className="w-full p-3 mt-4 bg-pink-600 rounded-lg text-white hover:bg-pink-700"
              >
                Log In
              </button>
              <a href='/forgot-password'>forget password</a>

              {error && (
                <p className="text-red-500 mt-4">
                  {typeof error === 'string' ? error : error.message || 'An error occurred'}
                </p>
              )}
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="mb-4">
              New here? <a href="#register" className="text-pink-600 hover:underline">Create an account</a>
            </p>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
              className="mx-auto"
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-5 text-center">
        <p>&copy; 2024 Barber Shop Booking. All rights reserved.</p>
        <div className="mt-3">
          <a href="#" className="text-pink-500 hover:underline">Privacy Policy</a> |
          <a href="#" className="text-pink-500 hover:underline mx-2">Terms of Service</a> |
          <a href="#" className="text-pink-500 hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
