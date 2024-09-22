import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopkeeperProfile } from '../../redux/slices/shopkeeperSlice';
import Header from './Header';
import Sidebar from './Sidebar';

const ShopkeeperProfile = () => {
  const dispatch = useDispatch();
  const { shopkeeper, loading, error } = useSelector((state) => state.shopkeeper);

  useEffect(() => {
    dispatch(fetchShopkeeperProfile());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="profile-container p-8 bg-gray-900 min-h-screen text-gray-300">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg">
          <div className="profile-header flex justify-between items-center mb-6 bg-indigo-900 text-white p-6">
            <h1 className="text-3xl font-bold">Shopkeeper Profile</h1>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
              Edit Profile
            </button>
          </div>
          <div className="profile-details flex flex-col md:flex-row p-6">
            <div className="profile-picture mb-6 md:mb-0 md:mr-8">
              <img
                src="/api/placeholder/160/160"
                alt="Shopkeeper Avatar"
                className="w-40 h-40 rounded-full border-4 border-indigo-600 shadow-lg"
              />
            </div>
            <div className="profile-info grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
              <div className="info-item bg-gray-700 p-4 rounded-lg shadow">
                <label className="font-semibold text-indigo-300 block mb-1">Shop Name:</label>
                <p className="text-gray-300">{shopkeeper?.shopName || 'N/A'}</p>
              </div>
              <div className="info-item bg-gray-700 p-4 rounded-lg shadow">
                <label className="font-semibold text-indigo-300 block mb-1">Owner Name:</label>
                <p className="text-gray-300">{shopkeeper?.name || 'N/A'}</p>
              </div>
              <div className="info-item bg-gray-700 p-4 rounded-lg shadow">
                <label className="font-semibold text-indigo-300 block mb-1">Email:</label>
                <p className="text-gray-300">{shopkeeper?.email || 'N/A'}</p>
              </div>
              <div className="info-item bg-gray-700 p-4 rounded-lg shadow">
                <label className="font-semibold text-indigo-300 block mb-1">Contact Number:</label>
                <p className="text-gray-300">{shopkeeper?.contactNumber || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopkeeperProfile;
