import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShop, fetchShopDetails } from '../../redux/slices/shopSlice'; 
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateShop = () => {
  const { state } = useLocation(); 
  const { shopId } = state || {}; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop, token, loading } = useSelector((state) => state.shop);

  const [shopData, setShopData] = useState({
    shopName: '',
    address: '',
    contactNumber: '',
    description: '',
    shopImage: null,
    licenseImage: null,
  });

  useEffect(() => {
    if (shopId && !shop) {
      dispatch(fetchShopDetails({ ownerId: shopId, token }));
    }
  }, [dispatch, shopId, shop, token]);

  useEffect(() => {
    if (shop) {
      setShopData({
        shopName: shop.shopName || '',
        address: shop.address || '',
        contactNumber: shop.contactNumber || '',
        description: shop.description || '',
      });
    }
  }, [shop]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setShopData({
      ...shopData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateShop({ shopId, shopData, token }))
      .then(() => {
        navigate('/dashboard/shopdetails');
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!shop) {
    return <ErrorMessage message="No shop data available to update." />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Update Shop
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6 bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-2xl">
          <InputField label="Shop Name" name="shopName" value={shopData.shopName} onChange={handleInputChange} required />
          <InputField label="Address" name="address" value={shopData.address} onChange={handleInputChange} required />
          <InputField label="Contact Number" name="contactNumber" value={shopData.contactNumber} onChange={handleInputChange} required />
          <TextAreaField label="Description" name="description" value={shopData.description} onChange={handleInputChange} required />
          <FileInput label="Shop Image" name="shopImage" onChange={handleInputChange} />
          <FileInput label="License Image" name="licenseImage" onChange={handleInputChange} />
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-indigo-300 mb-1">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-gray-700 bg-opacity-50 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-opacity-70 transition duration-200"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-indigo-300 mb-1">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows="4"
      className="w-full bg-gray-700 bg-opacity-50 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-opacity-70 transition duration-200"
    />
  </div>
);

const FileInput = ({ label, name, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-indigo-300 mb-1">{label}</label>
    <input
      type="file"
      id={name}
      name={name}
      onChange={onChange}
      className="w-full bg-gray-700 bg-opacity-50 rounded-lg py-2 px-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition duration-200"
    />
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="bg-red-600 text-white p-4 rounded-lg max-w-md mx-auto mt-8">
    <h3 className="text-lg font-bold mb-2">Error</h3>
    <p>{message}</p>
  </div>
);

export default UpdateShop;