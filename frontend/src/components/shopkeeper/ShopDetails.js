import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShopDetails } from '../../redux/slices/shopSlice';
import { useNavigate } from 'react-router-dom';

const ShopDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop, loading, error } = useSelector((state) => state.shop);
  const { shopkeeper, token } = useSelector((state) => state.shopkeeper);

  useEffect(() => {
    if (shopkeeper?.id && token) {
      dispatch(fetchShopDetails({ ownerId: shopkeeper.id, token }));
    }
  }, [dispatch, shopkeeper, token]);

  useEffect(() => {
    if (!loading && !shop) {
      navigate('/dashboard/addshop');
    }
  }, [shop, loading, navigate]);

  const handleUpdateClick = () => {
    navigate(`/dashboard/updateshop`, { state: { shopId: shop._id } });
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Check if the shop exists before rendering its details
  if (!shop) {
    return <div className="text-white">No shop details found. Please add your shop.</div>;
  }

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Shop Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DetailItem label="Shop Name" value={shop.shopName || 'N/A'} />
          <DetailItem label="Address" value={shop.address || 'N/A'} />
          <DetailItem label="Contact Number" value={shop.contactNumber || 'N/A'} />
          <DetailItem label="Description" value={shop.description || 'N/A'} />
        </div>
        <div className="space-y-6">
          <ImageItem label="Shop Image" src={shop.shopimage} alt="Shop" />
          <ImageItem label="License Image" src={shop.licenseUrl} alt="License" />
        </div>
      </div>
      <button 
        className="mt-8 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleUpdateClick}
      >
        Update Shop
      </button>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <strong className="text-indigo-300">{label}:</strong> 
    <span className="ml-2">{value}</span>
  </div>
);

const ImageItem = ({ label, src, alt }) => (
  <div>
    <strong className="text-indigo-300">{label}:</strong>
    <img src={src} alt={alt} className="w-full h-48 object-cover mt-2 rounded-lg" />
  </div>
);

export default ShopDetails;
