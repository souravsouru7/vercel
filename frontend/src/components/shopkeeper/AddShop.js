import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShop } from '../../redux/slices/shopSlice';
import { Store, Image, Phone, FileText, Upload, AlertCircle } from 'lucide-react';

const AddShop = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.shop);

  const [shopData, setShopData] = useState({
    shopName: '',
    address: '',
    contactNumber: '',
    description: '',
    shopImage: null,
    licenseImage: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!shopData.shopName) {
      errors.shopName = 'Shop name is required';
    }
    if (!shopData.address) {
      errors.address = 'Address is required';
    }
    if (!shopData.contactNumber || !/^\d{10}$/.test(shopData.contactNumber)) {
      errors.contactNumber = 'Valid contact number is required (10 digits)';
    }
    if (!shopData.description) {
      errors.description = 'Description is required';
    }
    if (!shopData.shopImage) {
      errors.shopImage = 'Shop image is required';
    }
    if (!shopData.licenseImage) {
      errors.licenseImage = 'License image is required';
    }
    return errors;
  };

  const handleChange = (e) => {
    setShopData({
      ...shopData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setShopData({
      ...shopData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setFormErrors({});
    dispatch(addShop(shopData));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Add New Shop</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border-l-4 border-red-500 text-red-100 rounded">
            <div className="flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Store size={20} className="mr-2 text-indigo-400" />
              Shop Name
            </label>
            <input
              type="text"
              name="shopName"
              value={shopData.shopName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formErrors.shopName && <p className="text-red-500 text-sm mt-1">{formErrors.shopName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <FileText size={20} className="mr-2 text-indigo-400" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={shopData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Phone size={20} className="mr-2 text-indigo-400" />
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={shopData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formErrors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">{formErrors.contactNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <FileText size={20} className="mr-2 text-indigo-400" />
              Description
            </label>
            <textarea
              name="description"
              value={shopData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
            ></textarea>
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Image size={20} className="mr-2 text-indigo-400" />
              Shop Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="text-indigo-400 mb-2" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  name="shopImage"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {formErrors.shopImage && <p className="text-red-500 text-sm mt-1">{formErrors.shopImage}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <FileText size={20} className="mr-2 text-indigo-400" />
              License Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="text-indigo-400 mb-2" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  name="licenseImage"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {formErrors.licenseImage && (
              <p className="text-red-500 text-sm mt-1">{formErrors.licenseImage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Add Shop'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
