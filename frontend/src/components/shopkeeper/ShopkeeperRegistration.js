import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerShopkeeper } from '../../redux/slices/shopkeeperSlice';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
const ShopkeeperRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.shopkeeper);
  const navigate = useNavigate();  // Use useNavigate for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validation logic...
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...dataToSend } = formData;
      dispatch(registerShopkeeper(dataToSend));
    }
  };

  useEffect(() => {
    if (success) {
      navigate('/shopkeeper/Login');  
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl">
        <div>
        <div className="flex flex-col items-center">
          <div className="bg-indigo-600 p-3 rounded-full">
            <Scissors className="h-10 w-10 text-white" />
          </div>
         
        </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Barbrezz</h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Shopkeeper Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Join our community of shopkeepers
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputField
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <InputField
              name="contactNumber"
              type="text"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              error={errors.contactNumber}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-400">Shopkeeper Registered Successfully!</p>}
      </div>
    </div>
  );
};

const InputField = ({ name, type, placeholder, value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="sr-only">
      {placeholder}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
  </div>
);

export default ShopkeeperRegistration;
