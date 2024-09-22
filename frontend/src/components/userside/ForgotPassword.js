import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (success) {
      navigate('/reset-password'); 
    }
  }, [success, navigate]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-100">
      <main className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg mt-40">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
          <p className="text-gray-400">Enter your email to receive an OTP.</p>
        </section>

        <section>
          <form onSubmit={handleSubmit}>
            <fieldset className="mb-4">
              <label htmlFor="email" className="block mb-2">Email Address:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-600 ${error ? 'border-red-500' : ''}`}
                required
              />
              {error && <p className="text-red-500 mb-4">{String(error)}</p>}
              {success && <p className="text-green-500 mb-4">OTP sent to your email</p>}
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-pink-600 rounded-lg text-white hover:bg-pink-700"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-5 text-center mt-10">
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

export default ForgotPassword;
