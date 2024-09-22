import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, verifyOtp } from '../../redux/slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { loading: authLoading, error, otpSent, otpVerified } = useSelector((state) => state.auth);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Full Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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

    const userData = { name, email, password, phoneNumber };
    dispatch(registerUser(userData));
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpData = { email, otp };
    dispatch(verifyOtp(otpData));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-100">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-100">
      <main className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-400">Join us and start booking your barber appointments easily.</p>
        </section>

        <section>
          {authLoading ? (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <p>Loading...</p>
            </div>
          ) : !otpSent ? (
            <form onSubmit={handleSubmit}>
              <fieldset className="mb-4">
                <label htmlFor="fullName" className="block mb-2">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                 
                  className={`w-full p-2 mb-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${formErrors.name ? 'border-red-500' : ''}`}
                />
                {formErrors.name && <p className="text-red-500 mb-4">{formErrors.name}</p>}

                <label htmlFor="email" className="block mb-2">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                  className={`w-full p-2 mb-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${formErrors.email ? 'border-red-500' : ''}`}
                />
                {formErrors.email && <p className="text-red-500 mb-4">{formErrors.email}</p>}

                <label htmlFor="phone" className="block mb-2">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
              </fieldset>

              <fieldset className="mb-4">
                <label htmlFor="password" className="block mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                  className={`w-full p-2 mb-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${formErrors.password ? 'border-red-500' : ''}`}
                />
                {formErrors.password && <p className="text-red-500 mb-4">{formErrors.password}</p>}

                <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  
                  className={`w-full p-2 mb-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                />
                {formErrors.confirmPassword && <p className="text-red-500 mb-4">{formErrors.confirmPassword}</p>}
              </fieldset>

              <fieldset className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="terms">
                  I agree to the{' '}
                  <a href="#" className="text-pink-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </fieldset>

              <button
                type="submit"
                className="w-full p-3 mt-4 bg-pink-600 rounded-lg text-white hover:bg-pink-700"
              >
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <fieldset className="mb-4">
                <label htmlFor="otp" className="block mb-2">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600"
                />
              </fieldset>
              <button
                type="submit"
                className="w-full p-3 mt-4 bg-pink-600 rounded-lg text-white hover:bg-pink-700"
              >
                Verify OTP
              </button>
            </form>
          )}

          {otpVerified && (
            <p className="text-green-500 mt-4">OTP Verified! Your account has been created.</p>
          )}

          {error && (
            <p className="text-red-500 mt-4">
              {typeof error === 'string' ? error : error.message || 'An error occurred'}
            </p>
          )}

          <div className="mt-6 text-center">
            <p className="mb-4">
              Already have an account?{' '}
              <a href="#login" className="text-pink-600 hover:underline">
                Login here
              </a>
            </p>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
              style={{ marginLeft: '161px' }}
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-5 text-center">
        <p>&copy; 2024 Barber Shop Booking. All rights reserved.</p>
        <div className="mt-3">
          <a href="#" className="text-pink-500 hover:underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#" className="text-pink-500 hover:underline mx-2">
            Terms of Service
          </a>{' '}
          |{' '}
          <a href="#" className="text-pink-500 hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Register;
